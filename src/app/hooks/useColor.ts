import {useEffect, useState} from "react";
import {prominent} from "color.js";

export function useColor(imageUrl: string) {
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        if (imageUrl.length && !colors.length) {
            (async () => {
                const data = await prominent(imageUrl, { amount: 3, format: 'hex' });
                // @ts-ignore
                setColors(data);
            })();
        }
    }, [colors, imageUrl]);

    return {colors}
}
