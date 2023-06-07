import {useCallback, useState} from "react";

export function useShow(init = false) {
    const [showMore, setShowMore] = useState<boolean>(init);
    const toggleShowMore = useCallback(() => {
        setShowMore(!showMore);
    }, [showMore]);

    return {showMore, toggleShowMore}
}
