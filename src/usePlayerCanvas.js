import { useEffect, useState } from "react";
import rough from "roughjs/bundled/rough.cjs";

// const axisOffset = 20;
// const line = { stroke: '#212121' };
// const dashedLine = { strokeLineDash: [15, 8], stroke: '#b0bec5' };

function usePlayerCanvas(dx, dy, size, canvasRef) {
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [mouseOnCircle, setMouseOnCircle] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [[x, y], setXY] = useState([dx + 100, dy + 100]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    setCanvas(rough.canvas(canvasRef.current));
    setCtx(canvasRef.current.getContext("2d"));
  }, [canvasRef]);

  useEffect(() => {
    if (!canvas || !ctx) {
      return;
    }

    const moveHandler = (event) => {
      const crc = new Path2D();
      crc.arc(x, y, 35, 0, 2 * Math.PI);

      if (dragging) {
        setXY([event.offsetX, event.offsetY]);
      } else if (ctx.isPointInPath(crc, event.offsetX, event.offsetY)) {
        setMouseOnCircle(true);
      } else {
        setMouseOnCircle(false);
      }
    };

    const downHandler = (event) => {
      setDragging(true);
      setXY([event.offsetX, event.offsetY]);
    };

    const upHandler = (event) => {
      setDragging(false);
      setXY([event.offsetX, event.offsetY]);
    };

    canvas.canvas.addEventListener("mousemove", moveHandler);
    canvas.canvas.addEventListener("mousedown", downHandler);
    canvas.canvas.addEventListener("mouseup", upHandler);

    return () => {
      canvas.canvas.removeEventListener("mousemove", moveHandler);
    };
  }, [ctx, canvas, dx, dy, dragging, x, y]);

  useEffect(() => {
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.circle(x, y, 35, {
      fill: mouseOnCircle ? "#8e24aa" : "#4db6ac",
    });
  }, [canvas, ctx, dx, dy, mouseOnCircle, x, y]);
}

export default usePlayerCanvas;
