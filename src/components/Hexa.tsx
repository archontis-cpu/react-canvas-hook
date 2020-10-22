import React from "react";
import useCanvas from "../hooks/useCanvas";
import redrawHexa from "../helpers/redrawHexa";
import initDrawHexa from "../helpers/initDrawHexa";

// const canvasWidth = window.innerWidth * 0.5;
// const canvasHeight = window.innerHeight * 0.5;

const Hexa: React.FC = () => {
  const canvasRef = useCanvas(initDrawHexa, redrawHexa);

  return <canvas ref={canvasRef} /*width={canvasWidth} height={canvasHeight}*/ />;
};

export default React.memo(Hexa);
