// Import Dependencies
import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------

export type BoxProps<T extends ElementType = "div"> = {
    component?: T;
    className?: string;
    children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

// Specialized type for any props
type AnyProps = Record<string, any>;

const Box = forwardRef<any, BoxProps & AnyProps>(function Box({
    component,
    className,
    ...rest
}, ref) {
    const Component = component || "div";

    return (
        <Component
            className={clsx("relative break-words print:border", className)}
            ref={ref}
            {...rest}
        />
    );
});

export { Box };
