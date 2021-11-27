import "./App.css";
import { useRef } from "react";
import useComplexityImpactCanvas from "./useComplexityImpactCanvas";
import usePlayerCanvas from "./usePlayerCanvas";
import useAPITest from "./useAPITest";

const dx = 200;
const dy = 100;
const diagramSize = 640;
const canvasSize = 900;

function App() {
  const backgroundCanvasRef = useRef(null);
  const playerCanvasRef = useRef(null);
  const [loading, error, data] = useAPITest();

  useComplexityImpactCanvas(dx, dy, diagramSize, backgroundCanvasRef);
  usePlayerCanvas(dx, dy, diagramSize, playerCanvasRef);

  return (
    <div className="App">
      {loading ? <span>loading</span> : <span>{data}</span>}
      <canvas
        ref={backgroundCanvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{
          width: canvasSize,
          height: canvasSize,
          position: "absolute",
          zIndex: 1,
        }}
      ></canvas>
      <canvas
        ref={playerCanvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{
          width: canvasSize,
          height: canvasSize,
          position: "absolute",
          zIndex: 2,
        }}
      ></canvas>
    </div>
  );
}

export default App;
