import React from "react";
import useCanvas from "../hooks/useCanvas";
import redrawHexa from "../helpers/redrawHexa";

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const Hexa: React.FC = () => {
  const canvasRef = useCanvas(canvasWidth, canvasHeight, redrawHexa);

  return <canvas ref={canvasRef} /*width={canvasWidth} height={canvasHeight}*/ />;
};

export default React.memo(Hexa);
