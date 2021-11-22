import { useEffect, useState } from "react";
import rough from "roughjs/bundled/rough.cjs";

// const axisOffset = 20;
// const line = { stroke: "#212121" };
// const dashedLine = { strokeLineDash: [15, 8], stroke: "#b0bec5" };

function usePlayerCanvas(dx, dy, size, canvasRef) {
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    setCanvas(rough.canvas(canvasRef.current));
    setCtx(canvasRef.current.getContext("2d"));
  }, [canvasRef]);

  useEffect(() => {
    if (!ctx) {
      return;
    }
  }, [ctx]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    canvas.circle(dx + 100, dy + 100, 35, { fill: "#4db6ac" });
  }, [canvas, dx, dy]);
}

export default usePlayerCanvas;
