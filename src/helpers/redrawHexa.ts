import { config, addDot, refreshDots, cnv } from "./draw";

import {
  drawRectGCO,
  drawRectShadow,
  drawRectBlur,
  drawRectFillColor,
  drawRectFill,
} from "./drawRect";

const color = config.backgroundFillColor;

export default function drawHexa(context: CanvasRenderingContext2D) {
  drawRectGCO(context, "normal");
  drawRectShadow(context, color);
  drawRectBlur(context, 0);
  drawRectFillColor(context, color);
  drawRectFill(context, 0, 0, cnv.cw, cnv.ch);

  addDot(context);
  refreshDots();
}
