import { useEffect, useState, useRef, useCallback } from "react";
import rough from "roughjs/bundled/rough.cjs";

// const axisOffset = 20;
// const line = { stroke: '#212121' };
// const dashedLine = { strokeLineDash: [15, 8], stroke: '#b0bec5' };

function PlayerCanvas(props) {
  const { dx, dy, canvasSize, diagramSize } = props;

  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [mouseOnCircle, setMouseOnCircle] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [[x, y], setXY] = useState([dx + 100, dy + 100]);
  const canvasRef = useRef(null);

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

    ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    canvas.circle(x, y, 35, {
      fill: mouseOnCircle ? "#8e24aa" : "#4db6ac",
    });
  }, [canvas, ctx, mouseOnCircle, x, y]);

  const handleMouseMove = (event) => {
    if (!ctx) {
      return;
    }
    const { clientX, clientY, target } = event;
    const { offsetLeft, offsetTop } = target;
    const xRel = clientX - offsetLeft;
    const yRel = clientY - offsetTop;

    const crc = new Path2D();
    crc.arc(x, y, 35, 0, 2 * Math.PI);
    const isCircleHovered = ctx.isPointInPath(crc, xRel, yRel);

    if (dragging && (x !== xRel || y !== yRel)) {
      setXY([
        Math.min(dx + diagramSize, Math.max(dx, xRel)),
        Math.min(dy + diagramSize, Math.max(dy, yRel)),
      ]);
    } else if (isCircleHovered && !mouseOnCircle) {
      setMouseOnCircle(true);
    } else if (!isCircleHovered && mouseOnCircle) {
      setMouseOnCircle(false);
    }
  };

  const handleTouchMove = useCallback(
    (event) => {
      const xRel =
        event.changedTouches[0].clientX - event.touches[0].target.offsetLeft;
      const yRel =
        event.changedTouches[0].clientY - event.touches[0].target.offsetTop;
      setXY([
        Math.min(dx + diagramSize, Math.max(dx, xRel)),
        Math.min(dy + diagramSize, Math.max(dy, yRel)),
      ]);
    },
    [dx, dy, diagramSize]
  );

  const handleMouseDown = useCallback(
    (event) => {
      setDragging(true);
      const { clientX, clientY, target } = event;
      const { offsetLeft, offsetTop } = target;
      const xRel = clientX - offsetLeft;
      const yRel = clientY - offsetTop;
      setXY([
        Math.min(dx + diagramSize, Math.max(dx, xRel)),
        Math.min(dy + diagramSize, Math.max(dy, yRel)),
      ]);
    },
    [dx, dy, diagramSize]
  );

  const handleMouseUp = useCallback(
    (event) => {
      setDragging(false);
      const { clientX, clientY, target } = event;
      const { offsetLeft, offsetTop } = target;
      const xRel = clientX - offsetLeft;
      const yRel = clientY - offsetTop;
      setXY([
        Math.min(dx + diagramSize, Math.max(dx, xRel)),
        Math.min(dy + diagramSize, Math.max(dy, yRel)),
      ]);
    },
    [dx, dy, diagramSize]
  );

  return (
    <canvas
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        width: canvasSize,
        height: canvasSize,
        position: "absolute",
        zIndex: 2,
      }}
    ></canvas>
  );
}

export default PlayerCanvas;
