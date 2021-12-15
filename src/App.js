import { useEffect, useState } from "react";
import "./App.css";
import ComplexityImpactCanvas from "./ComplexityImpactCanvas";
import PlayerCanvas from "./PlayerCanvas";
import ArchitectsDaughter from "./fonts/Architects_Daughter/ArchitectsDaughter-Regular.ttf";

const dx = 220;
const dy = 100;
const diagramSize = 640;
const canvasSize = 900;

function App() {
  const [fontReady, setFontReady] = useState(false);
  useEffect(() => {
    if (!fontReady) {
      const font = new FontFace(
        "Architects Daughter",
        `url(${ArchitectsDaughter})`
      );
      font
        .load()
        .then(() => {
          setFontReady(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [fontReady]);
  return (
    <div className="App">
      <ComplexityImpactCanvas
        dx={dx}
        dy={dy}
        canvasSize={canvasSize}
        diagramSize={diagramSize}
        fontReady={fontReady}
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
