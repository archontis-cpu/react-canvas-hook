import { config, drawRect, addDot, refreshDots, cnv } from "./index";

export default function drawHexa(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  drawRect(
    context,
    config.backgroundFillColor,
    0,
    0,
    cnv.cw,
    cnv.ch,
    0,
    0,
    "normal"
  );
  addDot(context);
  refreshDots();
}
