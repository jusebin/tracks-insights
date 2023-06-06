export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

/**
 *
 * @param hex - a string hexadecimal
 * @param s - (optional) a number saturation to override it
 * @param l - (optional) a number lightness to override it
 * @return HSLColor object
 * @example hexToHsl("#000") will return {h: 0, s: 0, l: 0}
 *
 */
export function hexToHsl(hex: string, s?: number, l?: number): HSLColor {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
        throw new Error("Invalid hexa code !");
    }

    hex = hex.slice(1);

    let r: number, g: number, b: number;
    if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
    } else {
        r = parseInt(hex[0] + hex[1], 16);
        g = parseInt(hex[2] + hex[3], 16);
        b = parseInt(hex[4] + hex[5], 16);
    }

    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    const max = Math.max(normalizedR, normalizedG, normalizedB);
    const min = Math.min(normalizedR, normalizedG, normalizedB);
    const lightness = l ? l : (max + min) / 2;

    const delta = max - min;
    const saturation = s ? s : lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    let hue: number;
    if (max === min) {
        hue = 0;
    } else {
        switch (max) {
            case normalizedR:
                hue = ((normalizedG - normalizedB) / delta) % 6;
                break;
            case normalizedG:
                hue = (normalizedB - normalizedR) / delta + 2;
                break;
            case normalizedB:
                hue = (normalizedR - normalizedG) / delta + 4;
                break;
            default:
                hue = 0;
                break;
        }
        hue = Math.round(hue * 60);
        if (hue < 0) {
            hue += 360;
        }
    }

    return { h: hue, s: saturation, l: lightness };
}
