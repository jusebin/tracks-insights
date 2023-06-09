'use client';

import {useEffect, useRef} from "react";

// I ignore the next import because there id no Typescript definition of this package, I will send a Pull Request to the owner
// @ts-ignore
import random from "canvas-sketch-util/random";
// @ts-ignore
import {lerp} from "canvas-sketch-util/math";
import useWindow from "@/app/hooks/use-window";
import {CANVAS_COLORS} from "@/app/constants/canvas-colors";
import {hexToRGBA} from "@/app/helpers/hex-to-rgba";


interface Point {
    radius: number;
    position: [number, number],
    rotation: number,
    opacity: number,
    color: string,
    colorHex: string,
}

export default function Canvas() {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const {windowSize} = useWindow();

    useEffect(() => {
        if (ref.current) {
            const canvas = ref.current;
            const context: RenderingContext | null = canvas.getContext('2d');

            if (context) {
                let canvasScale = 2;
                const createGrid = () => {
                    const points: Point[] = [];
                    const count = 20;
                    for (let x = 0; x < count; x++) {
                        for (let y = 0; y < count; y++) {
                            const u = count <= 1 ? 0.5 : x / (count - 1);
                            const v = count <= 1 ? 0.5 : y / (count - 1);
                            const opacity = 0;
                            const color = random.pick(CANVAS_COLORS.slice(1, CANVAS_COLORS.length));

                            points.push({
                                radius: Math.abs(random.noise2D(u, v)) * 0.1,
                                position: [u, v],
                                rotation: random.noise2D(u, v),
                                color: hexToRGBA(color, opacity),
                                colorHex: color,
                                opacity
                            });
                        }
                    }
                    return points;
                };

                const drawMiddleRect = () => {
                    context.fillStyle = '#000';
                    context.fillRect(0, windowSize[1] / 2 - 210 / 2, windowSize[0], 220);
                }

                const drawGrid = (grid: Point[]) => {
                    grid.forEach(({radius, position, color, rotation}) => {
                        const [u, v] = position;
                        const x = lerp(margin, windowSize[0] - margin, u);
                        const y = lerp(margin, windowSize[1] - margin, v);

                        context.save();
                        context.fillStyle = color;
                        context.font = `${radius * windowSize[0] + 100}px "Helvetica"`;

                        context.translate(x, y);
                        context.rotate(rotation);
                        context.fillText('-', 0, 0);

                        context.restore();
                    });

                    drawMiddleRect();
                }

                const revealGrid = (grid: Point[]) => {
                    let coefficient = 1;
                    const value = 0.01;

                    for (const cell of grid) {
                        cell.opacity = cell.opacity >= 1 ? 1 : cell.opacity + (value * coefficient);
                        cell.color = hexToRGBA(cell.colorHex, cell.opacity);
                    }
                }

                const grid = createGrid().filter(() => random.value() > 0.5);
                const margin = 0;

                const draw = () => {
                    context.fillStyle = CANVAS_COLORS[0];
                    context.fillRect(0, 0, windowSize[0], windowSize[1]);
                    drawGrid(grid);
                    revealGrid(grid);
                    requestAnimationFrame(draw);
                }

                draw();
            }
        }
    }, [ref, windowSize]);

    return (
        <>
            <canvas ref={ref} width={windowSize[0]} height={windowSize[1]} style={{
                border: "1px solid red",
                position: "fixed",
            }} />
        </>
    )
}
