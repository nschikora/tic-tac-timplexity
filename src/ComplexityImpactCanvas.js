import { useEffect, useState, useRef } from "react";
import rough from "roughjs/bundled/rough.cjs";

const axisOffset = 20;
const line = { stroke: "#212121" };
const dashedLine = { strokeLineDash: [15, 8], stroke: "#b0bec5" };

function ComplexityImpactCanvas(props) {
  const { dx, dy, diagramSize, canvasSize } = props;
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const canvasRef = useRef(null);

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

    // axis titles
    ctx.font = "48px Architects Daughter";
    ctx.fillStyle = "#1565c0";
    const { width: complexityWidth } = ctx.measureText("COMPLEXITY");
    const { width: impactWidth } = ctx.measureText("IMPACT");

    ctx.fillText(
      "IMPACT",
      dx - impactWidth - 2 * axisOffset,
      dy + (diagramSize - axisOffset) / 2
    );
    ctx.fillText(
      "COMPLEXITY",
      dx + diagramSize / 2 - complexityWidth / 2,
      dy + diagramSize + 3 * axisOffset
    );

    // area descriptors
    ctx.font = "32px Architects Daughter";

    ctx.fillStyle = "#4caf50";
    const { width: yesWidth } = ctx.measureText("YES!!!");
    ctx.fillText(
      "YES!!!",
      dx + ((diagramSize - 2 * axisOffset) * 1) / 4 - yesWidth / 2,
      dy + ((diagramSize - 2 * axisOffset) * 1) / 4 + axisOffset
    );

    ctx.fillStyle = "#f44336";
    const { width: noWidth } = ctx.measureText("NO");
    ctx.fillText(
      "NO",
      dx + ((diagramSize - 2 * axisOffset) * 3) / 4 - noWidth / 2,
      dy + ((diagramSize - 2 * axisOffset) * 3) / 4 + axisOffset
    );

    ctx.fillStyle = "#ffc107";
    const { width: maybeWidth } = ctx.measureText("MAYBE");
    ctx.fillText(
      "MAYBE",
      dx + ((diagramSize - 2 * axisOffset) * 1) / 4 - maybeWidth / 2,
      dy + ((diagramSize - 2 * axisOffset) * 3) / 4 + axisOffset
    );
    ctx.fillText(
      "MAYBE",
      dx + ((diagramSize - 2 * axisOffset) * 3) / 4 - maybeWidth / 2,
      dy + ((diagramSize - 2 * axisOffset) * 1) / 4 + axisOffset
    );

    // axis scale
    ctx.font = "18px Architects Daughter";
    ctx.fillStyle = "black";

    const { width: highWidth } = ctx.measureText("HIGH");
    const { width: lowWidth } = ctx.measureText("LOW");
    ctx.fillText("HIGH", dx - highWidth - 2 * axisOffset, dy);
    ctx.fillText(
      "LOW",
      dx - lowWidth - 2 * axisOffset,
      dy + diagramSize + 2 * axisOffset
    );
    ctx.fillText(
      "HIGH",
      dx + diagramSize - highWidth,
      dy + diagramSize + 2 * axisOffset
    );
  }, [ctx, dx, dy, diagramSize]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    // x and y axis
    canvas.linearPath(
      [
        [dx - axisOffset, dy - axisOffset],
        [dx - axisOffset, dy + diagramSize + axisOffset],
        [dx + diagramSize + axisOffset, dy + diagramSize + axisOffset],
      ],
      line
    );

    // y axis arrow
    canvas.linearPath(
      [
        [dx - 2 * axisOffset, dy - axisOffset],
        [dx - axisOffset, dy - 2 * axisOffset],
        [dx, dy - axisOffset],
      ],
      line
    );

    // x axis arrow
    canvas.linearPath(
      [
        [dx + diagramSize + axisOffset, dy + diagramSize],
        [dx + diagramSize + 2 * axisOffset, dy + diagramSize + axisOffset],
        [dx + diagramSize + axisOffset, dy + diagramSize + 2 * axisOffset],
      ],
      line
    );

    // vertical dashed line
    canvas.linearPath(
      [
        [dx + (diagramSize - 2 * axisOffset) / 2, dy + axisOffset],
        [
          dx + (diagramSize - 2 * axisOffset) / 2,
          dy + diagramSize - axisOffset,
        ],
      ],
      dashedLine
    );

    // horizontal dashed line
    canvas.linearPath(
      [
        [dx + axisOffset, dy + (diagramSize - 2 * axisOffset) / 2],
        [
          dx + diagramSize - axisOffset,
          dy + (diagramSize - 2 * axisOffset) / 2,
        ],
      ],
      dashedLine
    );
  }, [canvas, dx, dy, diagramSize]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      style={{
        width: canvasSize,
        height: canvasSize,
        position: "absolute",
        zIndex: 1,
      }}
    ></canvas>
  );
}

export default ComplexityImpactCanvas;
