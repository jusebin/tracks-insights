import {hexToHsl, HSLColor} from "@/app/helpers/hexToHsl";
import {createCanvas, loadImage} from "canvas";

export async function getDominantColor(imageUrl: string): Promise<HSLColor> {
    const canvas = createCanvas(640, 640);
    const context = canvas.getContext('2d');

    const image = await loadImage(imageUrl);

    canvas.width = image.width;
    canvas.height = image.height;

    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, image.width, image.height).data;

    const colorCounts: Map<string, number> = new Map();

    for (let i = 0; i < imageData.length; i += 4) {
        const [r, g, b] = Array.from(imageData.slice(i, i + 3));
        const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        if (colorCounts.has(hexColor)) {
            colorCounts.set(hexColor, colorCounts.get(hexColor)! + 1);
        } else {
            colorCounts.set(hexColor, 1);
        }
    }

    let maxCount = 0;
    let dominantColor = '';

    colorCounts.forEach((count, color) => {
        if (count > maxCount) {
            maxCount = count;
            dominantColor = color;
        }
    });

    return hexToHsl(dominantColor);
}
