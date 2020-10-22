import { useEffect, useRef } from "react";

import { drawCanvas, initDrawCanvas } from "../types";

export default function useCanvas(init: initDrawCanvas, draw: drawCanvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        init(canvas, context);        

        let animationFrameId: number;

        const render = () => {
          draw(canvas, context);
          animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
          cancelAnimationFrame(animationFrameId);
        };
      }
    }
  });

  return canvasRef;
}
