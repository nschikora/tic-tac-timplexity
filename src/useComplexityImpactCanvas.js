import { useEffect, useState } from "react";
import rough from "roughjs/bundled/rough.cjs";

const axisOffset = 20;
const line = { stroke: "#212121" };
const dashedLine = { strokeLineDash: [15, 8], stroke: "#b0bec5" };

function useComplexityImpactCanvas(dx, dy, size, canvasRef) {
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

    // axis titles
    ctx.font = "48px Architects Daughter";
    ctx.fillStyle = "#1565c0";
    const { width: complexityWidth } = ctx.measureText("COMPLEXITY");
    const { width: impactWidth } = ctx.measureText("IMPACT");
    ctx.fillText(
      "COMPLEXITY",
      dx + (size - 2 * axisOffset) / 2 - complexityWidth / 2,
      dy + size + axisOffset / 2
    );
    ctx.fillText("IMPACT", dx - impactWidth, dy + (size - axisOffset) / 2);

    // area descriptors
    ctx.font = "32px Architects Daughter";

    ctx.fillStyle = "#4caf50";
    const { width: yesWidth } = ctx.measureText("YES!!!");
    ctx.fillText(
      "YES!!!",
      dx + ((size - 2 * axisOffset) * 1) / 4 - yesWidth / 2,
      dy + ((size - 2 * axisOffset) * 1) / 4 + axisOffset
    );

    ctx.fillStyle = "#f44336";
    const { width: noWidth } = ctx.measureText("NO");
    ctx.fillText(
      "NO",
      dx + ((size - 2 * axisOffset) * 3) / 4 - noWidth / 2,
      dy + ((size - 2 * axisOffset) * 3) / 4 + axisOffset
    );

    ctx.fillStyle = "#ffc107";
    const { width: maybeWidth } = ctx.measureText("MAYBE");
    ctx.fillText(
      "MAYBE",
      dx + ((size - 2 * axisOffset) * 1) / 4 - maybeWidth / 2,
      dy + ((size - 2 * axisOffset) * 3) / 4 + axisOffset
    );
    ctx.fillText(
      "MAYBE",
      dx + ((size - 2 * axisOffset) * 3) / 4 - maybeWidth / 2,
      dy + ((size - 2 * axisOffset) * 1) / 4 + axisOffset
    );

    // axis scale
    ctx.font = "18px Architects Daughter";
    ctx.fillStyle = "black";

    const { width: highWidth } = ctx.measureText("HIGH");
    const { width: lowWidth } = ctx.measureText("LOW");
    ctx.fillText("HIGH", dx - highWidth - axisOffset, dy + axisOffset);
    ctx.fillText("LOW", dx - lowWidth, dy + size);
    ctx.fillText("HIGH", dx + size - highWidth - axisOffset, dy + size);
  }, [ctx, dx, dy, size]);

  useEffect(() => {
    if (!canvas) {
      return;
    }

    // x and y axis
    canvas.linearPath(
      [
        [dx + axisOffset, dy + axisOffset],
        [dx + axisOffset, dy + size - 2 * axisOffset],
        [dx + size - 2 * axisOffset, dy + size - 2 * axisOffset],
      ],
      line
    );

    // y axis arrow
    canvas.linearPath(
      [
        [dx + 0, dy + axisOffset],
        [dx + axisOffset, dy + 0],
        [dx + 2 * axisOffset, dy + axisOffset],
      ],
      line
    );

    // x axis arrow
    canvas.linearPath(
      [
        [dx + size - 2 * axisOffset, dy + size - 3 * axisOffset],
        [dx + size - axisOffset, dy + size - 2 * axisOffset],
        [dx + size - 2 * axisOffset, dy + size - axisOffset],
      ],
      line
    );

    // vertical dashed line
    canvas.linearPath(
      [
        [dx + (size - 2 * axisOffset) / 2, dy + 2 * axisOffset],
        [dx + (size - 2 * axisOffset) / 2, dy + size - 3 * axisOffset],
      ],
      dashedLine
    );

    // horizontal dashed line
    canvas.linearPath(
      [
        [dx + 2 * axisOffset, dy + (size - 2 * axisOffset) / 2],
        [dx + size - 3 * axisOffset, dy + (size - 2 * axisOffset) / 2],
      ],
      dashedLine
    );
  }, [canvas, dx, dy, size]);
}

export default useComplexityImpactCanvas;
