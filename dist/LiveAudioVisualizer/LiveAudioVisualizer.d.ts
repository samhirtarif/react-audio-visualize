import { type ReactElement } from "react";
export interface Props {
    /**
     * Media recorder who's stream needs to visualized
     */
    mediaRecorder: MediaRecorder;
    /**
     * Width of the visualization. Default" "100%"
     */
    width?: number | string;
    /**
     * Height of the visualization. Default" "100%"
     */
    height?: number | string;
    /**
     * Width of each individual bar in the visualization. Default: `2`
     */
    barWidth?: number;
    /**
     * Gap between each bar in the visualization. Default `1`
     */
    gap?: number;
    /**
     * BackgroundColor for the visualization: Default `transparent`
     */
    backgroundColor?: string;
    /**
     *  Color of the bars drawn in the visualization. Default: `"rgb(160, 198, 255)"`
     */
    barColor?: string;
    /**
     * An unsigned integer, representing the window size of the FFT, given in number of samples.
     * A higher value will result in more details in the frequency domain but fewer details in the amplitude domain.
     * For more details {@link https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize MDN AnalyserNode: fftSize property}
     * Default: `1024`
     */
    fftSize?: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768;
    /**
     * A double, representing the maximum decibel value for scaling the FFT analysis data
     * For more details {@link https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/maxDecibels MDN AnalyserNode: maxDecibels property}
     * Default: `-10`
     */
    maxDecibels?: number;
    /**
     * A double, representing the minimum decibel value for scaling the FFT analysis data, where 0 dB is the loudest possible sound
     * For more details {@link https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/minDecibels MDN AnalyserNode: minDecibels property}
     * Default: `-90`
     */
    minDecibels?: number;
    /**
     * A double within the range 0 to 1 (0 meaning no time averaging). The default value is 0.8.
     * If 0 is set, there is no averaging done, whereas a value of 1 means "overlap the previous and current buffer quite a lot while computing the value",
     * which essentially smooths the changes across
     * For more details {@link https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant MDN AnalyserNode: smoothingTimeConstant property}
     * Default: `0.4`
     */
    smoothingTimeConstant?: number;
}
declare const LiveAudioVisualizer: (props: Props) => ReactElement;
export { LiveAudioVisualizer };
