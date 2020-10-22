import { useCallback, useEffect, useRef } from "react";
import { canvasHook } from "../types";
import { cnv, createDirs } from "../helpers/draw";

const useCanvas: canvasHook = (width, height, draw) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resizeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    cnv.cw = canvas.width = width;
    cnv.ch = canvas.height = height;
    cnv.cx = cnv.cw / 2;
    cnv.cy = cnv.ch / 2;
  }, [width, height]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      resizeCanvas(canvas);

      if (context) {
        createDirs();

        let animationFrameId: number;

        const render = () => {
          draw(context);
          animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      }
    }
  }, [resizeCanvas, draw]);

  return canvasRef;
};

export default useCanvas;
