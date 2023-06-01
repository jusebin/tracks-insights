import {MutableRefObject, useEffect, useState} from "react";

export function useIntersection(ref: MutableRefObject<HTMLDivElement>, rootMarginSize: number) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, {rootMargin: `${rootMarginSize}px`});

        ref && observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, rootMarginSize])

    return {isVisible};
}
