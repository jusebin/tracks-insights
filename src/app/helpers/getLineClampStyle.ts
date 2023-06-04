export function getLineClampStyle(lineClamp: number) {
    return {
        display: "-webkit-box",
        WebkitLineClamp: lineClamp,
        WebkitBoxOrient: "vertical",
        overflow: "hidden"
    }
}
