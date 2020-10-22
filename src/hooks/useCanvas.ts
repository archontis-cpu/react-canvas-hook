import { useEffect, useRef } from "react";

import { drawCanvas } from "../types";

export default function useCanvas(draw: drawCanvas) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        //@ts-ignore
        let cw, ch, cx, cy;

        const resizeCanvas = () => {
          // eslint-disable-next-line no-restricted-globals
          cw = canvas.width = innerWidth;
          // eslint-disable-next-line no-restricted-globals
          ch = canvas.height = innerHeight;
          cx = cw / 2;
          cy = ch / 2;
        };

        const config = {
          hue: 0,
          backgroundFillColor: "rgba(50, 50, 50, 0.01)",
          dirsCount: 3,
          stepsToTurn: 20,
          dotSize: 2,
          dotsCount: 300,
          dotVelocity: 3,
          distance: 200,
          gradientLength: 10,
          gridAngle: 45,
        };

        resizeCanvas();

        window.addEventListener("resize", resizeCanvas);

        interface Position {
          x: number;
          y: number;
        }
        //@ts-ignore
        const drawRect = (color, x, y, w, h, shadowColor, shadowBlur, gco) => {
          context.globalCompositeOperation = gco;
          context.shadowColor = shadowColor || "black";
          context.shadowBlur = shadowBlur || 1;
          context.fillStyle = color;
          context.fillRect(x, y, w, h);
        };

        class Dot {
          pos: Position;
          dir: number;
          step: number;

          constructor() {
            //@ts-ignore
            this.pos = { x: cx, y: cy };
            this.dir =
              config.dirsCount === 6
                ? ((Math.random() * 3) | 0) * 2
                : (Math.random() * config.dirsCount) | 0;
            this.step = 0;
          }

          redrawDot() {
            //@ts-ignore
            let xy = Math.abs(this.pos.x - cx) + Math.abs(this.pos.y - cy);
            let makeHue = (config.hue + xy / config.gradientLength) % 360;
            let blur = config.dotSize - Math.sin(xy / 8);
            let color = `hsl(${makeHue}, 100%, 50%)`;
            let size = config.dotSize - Math.sin(xy / 9) * 2 - Math.sin(xy / 2);
            let x = this.pos.x - size / 2;
            let y = this.pos.y - size / 2;

            drawRect(color, x, y, size, size, color, blur, "lighter");
          }

          moveDot() {
            this.step++;
            //@ts-ignore
            this.pos.x += dirsList[this.dir].x * config.dotVelocity;
            //@ts-ignore
            this.pos.y += dirsList[this.dir].y * config.dotVelocity;
          }

          changeDir() {
            if (this.step % config.stepsToTurn === 0) {
              this.dir =
                Math.random() > 0.5
                  ? (this.dir + 1) % config.dirsCount
                  : (this.dir + config.dirsCount - 1) % config.dirsCount;
            }
          }
          //@ts-ignore
          killDot(id) {
            let percent = Math.random() * Math.exp(this.step / config.distance);
            if (percent > 100) {
              //@ts-ignore
              dotsList.splice(id, 1);
            }
          }
        }
        //@ts-ignore
        let dotsList = [];

        const addDot = () => {
          if (dotsList.length < config.dotsCount && Math.random() > 0.8) {
            dotsList.push(new Dot());
            config.hue = (config.hue + 1) % 360;
          }
        };

        const refreshDots = () => {
          //@ts-ignore
          dotsList.forEach((i, id) => {
            i.moveDot();
            i.redrawDot();
            i.changeDir();
            i.killDot(id);
          });
        };

        let dirsList: number[] = [];

        const createDirs = () => {
          for (let i = 0; i < 360; i += 360 / config.dirsCount) {
            let angle = config.gridAngle + i;
            let x = Math.cos((angle * Math.PI) / 180);
            let y = Math.sin((angle * Math.PI) / 180);
            //@ts-ignore
            dirsList.push({ x: x, y: y });
          }
        };

        createDirs();

        let animationFrameId: number;

        const render = () => {
          // draw(canvas, context);
          //@ts-ignore
          drawRect(config.backgroundFillColor, 0, 0, cw, ch, 0, 0, `normal`);
          addDot();
          refreshDots();
          animationFrameId = requestAnimationFrame(render);
          // requestAnimationFrame(render);
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
