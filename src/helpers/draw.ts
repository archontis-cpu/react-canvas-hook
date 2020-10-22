import { Directions } from "../types";
import {
  drawRectGCO,
  drawRectShadow,
  drawRectBlur,
  drawRectFillColor,
  drawRectFill,
} from "./drawRect";

const background = "rgba(50, 50, 50, 0.01)";

export const config = {
  hue: 0,
  backgroundFillColor: background,
  dirsCount: 6,
  stepsToTurn: 20,
  dotSize: 1,
  dotsCount: 300,
  dotVelocity: 3,
  distance: 200,
  gradientLength: 10,
  gridAngle: 0,
};

export const cnv = {
  cw: 0,
  ch: 0,
  cx: 0,
  cy: 0,
};

export const dotsList: any = [];

const chooseDirection = (dirs: number) => {
  return dirs === 6
    ? ((Math.random() * 3) | 0) * 2
    : (Math.random() * config.dirsCount) | 0;
};

export class Dot {
  context: CanvasRenderingContext2D;
  position = { x: cnv.cx, y: cnv.cy };
  step = 0;
  dir = chooseDirection(config.dirsCount);

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  redrawDot() {
    //@ts-ignore
    const xy =
      Math.abs(this.position.x - cnv.cx) + Math.abs(this.position.y - cnv.cy);
    const makeHue = (config.hue + xy / config.gradientLength) % 360;
    const blur = config.dotSize - Math.sin(xy / 8);
    const color = `hsl(${makeHue}, 100%, 50%)`;
    const size = config.dotSize - Math.sin(xy / 9) * 2 - Math.sin(xy / 2);
    const x = this.position.x - size / 2;
    const y = this.position.y - size / 2;

    // drawRect(this.context, color, x, y, size, size, color, blur, "lighter");
    drawRectGCO(this.context, "lighter");
    drawRectShadow(this.context, color);
    drawRectBlur(this.context, blur);
    drawRectFillColor(this.context, color);
    drawRectFill(this.context, x, y, size, size);
  }

  moveDot() {
    this.step++;
    //@ts-ignore
    this.position.x += dirsList[this.dir].x * config.dotVelocity;
    //@ts-ignore
    this.position.y += dirsList[this.dir].y * config.dotVelocity;
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

export const addDot = (context: CanvasRenderingContext2D) => {
  if (dotsList.length < config.dotsCount && Math.random() > 0.8) {
    dotsList.push(new Dot(context));
    config.hue = (config.hue + 1) % 360;
  }
};

export const refreshDots = () => {
  //@ts-ignore
  dotsList.forEach((i, id) => {
    i.moveDot();
    i.redrawDot();
    i.changeDir();
    i.killDot(id);
  });
};

const dirsList: Directions[] = [];

export const createDirs = () => {
  for (let i = 0; i < 360; i += 360 / config.dirsCount) {
    const angle = config.gridAngle + i;
    const x = Math.cos((angle * Math.PI) / 180);
    const y = Math.sin((angle * Math.PI) / 180);
    dirsList.push({ x, y });
  }
};
