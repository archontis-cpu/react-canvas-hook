import { cnv, createDirs } from "./index";

export default function initDrawHexa(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  //@ts-ignore
  // let cw, ch, cx, cy;

  const resizeCanvas = () => {
    // eslint-disable-next-line no-restricted-globals
    cnv.cw = canvas.width = innerWidth;
    // eslint-disable-next-line no-restricted-globals
    cnv.ch = canvas.height = innerHeight;
    cnv.cx = cnv.cw / 2;
    cnv.cy = cnv.ch / 2;
  };

  resizeCanvas();

  // window.addEventListener("resize", resizeCanvas);

  createDirs();

  context.restore();
}
