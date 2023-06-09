import {useEffect, useState} from "react";

const isBrowser = () => typeof window !== 'undefined';

export default function useWindow() {
    const [windowSize, setWindowSize] = useState([
        0, 0
    ]);

    useEffect(() => {
        if (isBrowser()) {
            const handleWindowSize = () => {
                setWindowSize([window.innerWidth, window.innerHeight]);
            }

            setWindowSize([window.innerWidth, window.innerHeight]);
            window.addEventListener('resize', handleWindowSize);

            return () => window.removeEventListener('resize', handleWindowSize);
        }
    }, []);

    return {windowSize};
}
