export const config = {
  hue: 0,
  backgroundFillColor: "rgba(50, 50, 50, 0.01)",
  dirsCount: 3,
  stepsToTurn: 20,
  dotSize: 2,
  dotsCount: 300,
  dotVelocity: 3,
  distance: 200,
  gradientLength: 10,
  gridAngle: 0,
};

export const cnv = {
  cw: 0, ch: 0, cx: 0, cy: 0
}

export const dotsList: any = [];

export class Dot {
  context: CanvasRenderingContext2D;
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
  }
  //@ts-ignore
  pos = { x: cnv.cx, y: cnv.cy };
  step = 0;
  dir =
    config.dirsCount === 6
      ? ((Math.random() * 3) | 0) * 2
      : (Math.random() * config.dirsCount) | 0;

  redrawDot() {
    //@ts-ignore
    let xy = Math.abs(this.pos.x - cnv.cx) + Math.abs(this.pos.y - cnv.cy);
    let makeHue = (config.hue + xy / config.gradientLength) % 360;
    let blur = config.dotSize - Math.sin(xy / 8);
    let color = `hsl(${makeHue}, 100%, 50%)`;
    let size = config.dotSize - Math.sin(xy / 9) * 2 - Math.sin(xy / 2);
    let x = this.pos.x - size / 2;
    let y = this.pos.y - size / 2;

    drawRect(this.context, color, x, y, size, size, color, blur, "lighter");
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
export const drawRect = (context, color, x, y, w, h, shadowColor, shadowBlur, gco) => {
    context.globalCompositeOperation = gco;
    context.shadowColor = shadowColor || "black";
    context.shadowBlur = shadowBlur || 1;
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  };

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

    // console.log("1");
  });
};

let dirsList: number[] = [];

export const createDirs = () => {
  for (let i = 0; i < 360; i += 360 / config.dirsCount) {
    let angle = config.gridAngle + i;
    let x = Math.cos((angle * Math.PI) / 180);
    let y = Math.sin((angle * Math.PI) / 180);
    //@ts-ignore
    dirsList.push({ x: x, y: y });
  }
};
