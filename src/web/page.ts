/**
 * Informs the interceptor to render a page as a response
 */
export class Page {
    constructor(public readonly props: Record<string, any> = {}) {}
}
