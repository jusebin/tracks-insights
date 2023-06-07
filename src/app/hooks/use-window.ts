import {useEffect, useState} from "react";

export default function useWindow() {
    const [windowSize, setWindowSize] = useState([
        window.innerWidth, window.innerHeight
    ]);

    useEffect(() => {
        const handleWindowSize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', handleWindowSize);

        return () => window.removeEventListener('resize', handleWindowSize);
    }, []);

    return {windowSize};
}
