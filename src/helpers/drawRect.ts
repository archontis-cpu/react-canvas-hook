export const drawRectGCO = (
  context: CanvasRenderingContext2D,
  globalCompositeOperation: string
) => {
  context.globalCompositeOperation = globalCompositeOperation;
};

export const drawRectShadow = (
  context: CanvasRenderingContext2D,
  shadowColor: string
) => {
  context.shadowColor = shadowColor || "black";
};

export const drawRectBlur = (
  context: CanvasRenderingContext2D,
  shadowBlur: number
) => {
  context.shadowBlur = shadowBlur || 1;
};

export const drawRectFillColor = (
  context: CanvasRenderingContext2D,
  color: string
) => {
  context.fillStyle = color;
};

export const drawRectFill = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  context.fillRect(x, y, w, h);
};
