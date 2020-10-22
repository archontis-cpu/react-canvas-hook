export type drawCanvas = (context: CanvasRenderingContext2D) => void;

export type canvasHook = (
  width: number,
  height: number,
  draw: drawCanvas
) => React.RefObject<HTMLCanvasElement>;

export interface Directions {
  x: number;
  y: number;
}