import { type dataPoint } from "./types";
export declare const calculateBarData: (buffer: AudioBuffer, height: number, width: number, barWidth: number, gap: number) => dataPoint[];
export declare const draw: (data: dataPoint[], canvas: HTMLCanvasElement, barWidth: number, gap: number, backgroundColor: string, barColor: string, barPlayedColor?: string, currentTime?: number, duration?: number) => void;
