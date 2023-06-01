import {Box} from "@/app/components/box";
import {useEffect, useRef} from "react";
import {useIntersection} from "@/app/hooks/useIntersection";

export function Intersection({callback, margin}: {
    callback: (prop?: any) => void | any,
    margin: number
}) {
    const ref = useRef<HTMLDivElement>(null!);
    const {isVisible} = useIntersection(ref, margin);

    useEffect(() => {
        if (isVisible) {
            callback();
        }
    }, [callback, isVisible])

    return (
        <Box ref={ref} css={{height: "2px", background: isVisible ? 'blue' : 'red'}} />
    )
}
