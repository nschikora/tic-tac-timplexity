import "./App.css";
import ComplexityImpactCanvas from "./ComplexityImpactCanvas";
import PlayerCanvas from "./PlayerCanvas";

const dx = 220;
const dy = 100;
const diagramSize = 640;
const canvasSize = 900;

function App() {
  return (
    <div className="App">
      <ComplexityImpactCanvas
        dx={dx}
        dy={dy}
        canvasSize={canvasSize}
        diagramSize={diagramSize}
      />
      <PlayerCanvas
        dx={dx}
        dy={dy}
        canvasSize={canvasSize}
        diagramSize={diagramSize}
      />
    </div>
  );
}

export default App;
