import {CSSProperties} from "react";

/**
 *
 * @param lineClamp - the number of line clamp you want to apply the property on your DOM node.
 * see more (https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
 * @return CSSProperties - a CSSProperties item
 * @example
 *
 * getLineClampStyle(1) will return {
 *      WebkitLineClamp: 1,
 *      ...
 * }
 *
 */
export function getLineClampStyle(lineClamp: number): CSSProperties {
    return {
        display: "-webkit-box",
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
    }
}
