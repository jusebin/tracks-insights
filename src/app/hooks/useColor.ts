import {useEffect, useState} from "react";
import {average, prominent} from "color.js";
import {hexToHsl, HSLColor} from "@/app/helpers/hexToHsl";

export function useColor({imageUrl, amount = 3}: {
    imageUrl?: string,
    amount: number
}) {
    const [colors, setColors] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (imageUrl && !colors) {
            (async () => {
                const data = await average(imageUrl, {
                    amount,
                    format: 'hex',
                    group: 40,
                    sample: 30
                });
                // @ts-ignore
                // const HSL: HSLColor = hexToHsl(data, 100, 60);

                setColors(data);
            })();
        }
    }, [amount, colors, imageUrl]);

    return {colors}
}
