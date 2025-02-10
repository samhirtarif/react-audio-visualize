interface Props {
    /**
     * Audio blob to visualize
     */
    blob: Blob;
    /**
     * Width of the visualizer
     */
    width: number;
    /**
     * Height of the visualizer
     */
    height: number;
    /**
     * Width of each individual bar in the visualization. Default: `2`
     */
    barWidth?: number;
    /**
     * Gap between each bar in the visualization. Default: `1`
     */
    gap?: number;
    /**
     * BackgroundColor for the visualization: Default: `"transparent"`
     */
    backgroundColor?: string;
    /**
     * Color for the bars that have not yet been played: Default: `"rgb(184, 184, 184)""`
     */
    barColor?: string;
    /**
     * Color for the bars that have been played: Default: `"rgb(160, 198, 255)""`
     */
    barPlayedColor?: string;
    /**
     * Current time stamp till which the audio blob has been played.
     * Visualized bars that fall before the current time will have `barPlayerColor`, while that ones that fall after will have `barColor`
     */
    currentTime?: number;
    /**
     * Custome styles that can be passed to the visualization canvas
     */
    style?: React.CSSProperties;
    /**
     * A `ForwardedRef` for the `HTMLCanvasElement`
     */
    ref?: React.ForwardedRef<HTMLCanvasElement>;
}
declare const AudioVisualizer: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLCanvasElement>>;
export { AudioVisualizer };
