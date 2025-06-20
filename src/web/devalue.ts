/** @type {Record<string, string>} */
export const escaped = {
    '<': '\\u003C',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029',
};

export class DevalueError extends Error {
    /**
     * @param {string} message
     * @param {string[]} keys
     */
    constructor(message, keys) {
        super(message);
        this.name = 'DevalueError';
        //@ts-expect-error Adding custom path property to Error instance
        this.path = keys.join('');
    }
}

/** @param {any} thing */
export function is_primitive(thing) {
    return Object(thing) !== thing;
}

const object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
    Object.prototype
)
    .sort()
    .join('\0');

/** @param {any} thing */
export function is_plain_object(thing) {
    const proto = Object.getPrototypeOf(thing);

    return (
        proto === Object.prototype ||
        proto === null ||
        Object.getOwnPropertyNames(proto).sort().join('\0') ===
            object_proto_names
    );
}

/** @param {any} thing */
export function get_type(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}

/** @param {string} char */
function get_escaped_char(char) {
    switch (char) {
        case '"':
            return '\\"';
        case '<':
            return '\\u003C';
        case '\\':
            return '\\\\';
        case '\n':
            return '\\n';
        case '\r':
            return '\\r';
        case '\t':
            return '\\t';
        case '\b':
            return '\\b';
        case '\f':
            return '\\f';
        case '\u2028':
            return '\\u2028';
        case '\u2029':
            return '\\u2029';
        default:
            return char < ' '
                ? `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
                : '';
    }
}

/** @param {string} str */
export function stringify_string(str) {
    let result = '';
    let last_pos = 0;
    const len = str.length;

    for (let i = 0; i < len; i += 1) {
        const char = str[i];
        const replacement = get_escaped_char(char);
        if (replacement) {
            result += str.slice(last_pos, i) + replacement;
            last_pos = i + 1;
        }
    }

    return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

/** @param {Record<string | symbol, any>} object */
export function enumerable_symbols(object) {
    return Object.getOwnPropertySymbols(object).filter(
        (symbol) => Object.getOwnPropertyDescriptor(object, symbol).enumerable
    );
}

const is_identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;

/** @param {string} key */
export function stringify_key(key) {
    return is_identifier.test(key)
        ? '.' + key
        : '[' + JSON.stringify(key) + ']';
}

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
const unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
const reserved =
    /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;

/**
 * Turn a value into the JavaScript that creates an equivalent value
 * @param {any} value
 * @param {(value: any) => string | void} [replacer]
 */
export function uneval(value, replacer?) {
    const counts = new Map();

    /** @type {string[]} */
    const keys = [];

    const custom = new Map();

    /** @param {any} thing */
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new DevalueError(`Cannot stringify a function`, keys);
        }

        if (!is_primitive(thing)) {
            if (counts.has(thing)) {
                counts.set(thing, counts.get(thing) + 1);
                return;
            }

            counts.set(thing, 1);

            if (replacer) {
                const str = replacer(thing);

                if (typeof str === 'string') {
                    custom.set(thing, str);
                    return;
                }
            }

            const type = get_type(thing);

            switch (type) {
                case 'Number':
                case 'BigInt':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;

                case 'Array':
                    /** @type {any[]} */ thing.forEach((value, i) => {
                        keys.push(`[${i}]`);
                        walk(value);
                        keys.pop();
                    });
                    break;

                case 'Set':
                    Array.from(thing).forEach(walk);
                    break;

                case 'Map':
                    for (const [key, value] of thing) {
                        keys.push(
                            `.get(${is_primitive(key) ? stringify_primitive(key) : '...'})`
                        );
                        walk(value);
                        keys.pop();
                    }
                    break;

                case 'Int8Array':
                case 'Uint8Array':
                case 'Uint8ClampedArray':
                case 'Int16Array':
                case 'Uint16Array':
                case 'Int32Array':
                case 'Uint32Array':
                case 'Float32Array':
                case 'Float64Array':
                case 'BigInt64Array':
                case 'BigUint64Array':
                    return;

                case 'ArrayBuffer':
                    return;

                default:
                    if (!is_plain_object(thing)) {
                        throw new DevalueError(
                            `Cannot stringify arbitrary non-POJOs`,
                            keys
                        );
                    }

                    if (enumerable_symbols(thing).length > 0) {
                        throw new DevalueError(
                            `Cannot stringify POJOs with symbolic keys`,
                            keys
                        );
                    }

                    for (const key in thing) {
                        keys.push(stringify_key(key));
                        walk(thing[key]);
                        keys.pop();
                    }
            }
        }
    }

    walk(value);

    const names = new Map();

    Array.from(counts)
        .filter((entry) => entry[1] > 1)
        .sort((a, b) => b[1] - a[1])
        .forEach((entry, i) => {
            names.set(entry[0], get_name(i));
        });

    /**
     * @param {any} thing
     * @returns {string}
     */
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }

        if (is_primitive(thing)) {
            return stringify_primitive(thing);
        }

        if (custom.has(thing)) {
            return custom.get(thing);
        }

        const type = get_type(thing);

        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return `Object(${stringify(thing.valueOf())})`;

            case 'RegExp':
                return `new RegExp(${stringify_string(thing.source)}, "${
                    thing.flags
                }")`;

            case 'Date':
                return `new Date(${thing.getTime()})`;

            case 'Array':
                const members = /** @type {any[]} */ thing.map((v, i) =>
                    i in thing ? stringify(v) : ''
                );
                const tail =
                    thing.length === 0 || thing.length - 1 in thing ? '' : ',';
                return `[${members.join(',')}${tail}]`;

            case 'Set':
            case 'Map':
                return `new ${type}([${Array.from(thing).map(stringify).join(',')}])`;

            case 'Int8Array':
            case 'Uint8Array':
            case 'Uint8ClampedArray':
            case 'Int16Array':
            case 'Uint16Array':
            case 'Int32Array':
            case 'Uint32Array':
            case 'Float32Array':
            case 'Float64Array':
            case 'BigInt64Array':
            case 'BigUint64Array': {
                /** @type {import("./types.js").TypedArray} */
                const typedArray = thing;
                return `new ${type}([${typedArray.toString()}])`;
            }

            case 'ArrayBuffer': {
                const ui8 = new Uint8Array(thing);
                return `new Uint8Array([${ui8.toString()}]).buffer`;
            }

            default:
                const obj = `{${Object.keys(thing)
                    .map((key) => `${safe_key(key)}:${stringify(thing[key])}`)
                    .join(',')}}`;
                const proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? `Object.assign(Object.create(null),${obj})`
                        : `Object.create(null)`;
                }

                return obj;
        }
    }

    const str = stringify(value);

    if (names.size) {
        /** @type {string[]} */
        const params = [];

        /** @type {string[]} */
        const statements = [];

        /** @type {string[]} */
        const values = [];

        names.forEach((name, thing) => {
            params.push(name);

            if (custom.has(thing)) {
                values.push(/** @type {string} */ custom.get(thing));
                return;
            }

            if (is_primitive(thing)) {
                values.push(stringify_primitive(thing));
                return;
            }

            const type = get_type(thing);

            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values.push(`Object(${stringify(thing.valueOf())})`);
                    break;

                case 'RegExp':
                    values.push(thing.toString());
                    break;

                case 'Date':
                    values.push(`new Date(${thing.getTime()})`);
                    break;

                case 'Array':
                    values.push(`Array(${thing.length})`);
                    /** @type {any[]} */ thing.forEach((v, i) => {
                        statements.push(`${name}[${i}]=${stringify(v)}`);
                    });
                    break;

                case 'Set':
                    values.push(`new Set`);
                    statements.push(
                        `${name}.${Array.from(thing)
                            .map((v) => `add(${stringify(v)})`)
                            .join('.')}`
                    );
                    break;

                case 'Map':
                    values.push(`new Map`);
                    statements.push(
                        `${name}.${Array.from(thing)
                            .map(
                                ([k, v]) =>
                                    `set(${stringify(k)}, ${stringify(v)})`
                            )
                            .join('.')}`
                    );
                    break;

                default:
                    values.push(
                        Object.getPrototypeOf(thing) === null
                            ? 'Object.create(null)'
                            : '{}'
                    );
                    Object.keys(thing).forEach((key) => {
                        statements.push(
                            `${name}${safe_prop(key)}=${stringify(thing[key])}`
                        );
                    });
            }
        });

        statements.push(`return ${str}`);

        return `(function(${params.join(',')}){${statements.join(
            ';'
        )}}(${values.join(',')}))`;
    } else {
        return str;
    }
}

/** @param {number} num */
function get_name(num) {
    let name = '';

    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);

    return reserved.test(name) ? `${name}0` : name;
}

/** @param {string} c */
function escape_unsafe_char(c) {
    return escaped[c] || c;
}

/** @param {string} str */
function escape_unsafe_chars(str) {
    return str.replace(unsafe_chars, escape_unsafe_char);
}

/** @param {string} key */
function safe_key(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
        ? key
        : escape_unsafe_chars(JSON.stringify(key));
}

/** @param {string} key */
function safe_prop(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
        ? `.${key}`
        : `[${escape_unsafe_chars(JSON.stringify(key))}]`;
}

/** @param {any} thing */
function stringify_primitive(thing) {
    if (typeof thing === 'string') return stringify_string(thing);
    if (thing === void 0) return 'void 0';
    if (thing === 0 && 1 / thing < 0) return '-0';
    const str = String(thing);
    if (typeof thing === 'number') return str.replace(/^(-)?0\./, '$1.');
    if (typeof thing === 'bigint') return thing + 'n';
    return str;
}
