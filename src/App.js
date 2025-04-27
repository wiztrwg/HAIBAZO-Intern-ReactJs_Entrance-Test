import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [points, setPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generatePoints = () => {
    const newPoints = [];
    for (let i = 1; i <= 10; i++) {
      newPoints.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      });
    }
    setPoints(newPoints);
    setGameOver(false);
    setTime(0);
  };

  useEffect(() => {
    generatePoints();
  }, []);

  useEffect(() => {
    let timer;
    if (!gameOver) {
      timer = setInterval(() => {
        setTime((prev) => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameOver]);

  const handleClick = (id) => {
    const newPoints = points.filter((point) => point.id !== id);
    setPoints(newPoints);

    if (newPoints.length === 0) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    generatePoints();
  };

  return (
    <div className="App">
      <h1>LET'S PLAY</h1>
      <div className="info">
        <p>Points: {points.length}</p>
        <p>Time: {time.toFixed(1)}s</p>
        <button onClick={handleRestart}>Restart</button>
      </div>

      <div className="container">
        {points.map((point) => (
          <div
            key={point.id}
            className="point"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            onClick={() => handleClick(point.id)}
          >
            {point.id}
          </div>
        ))}
        {gameOver && <div className="all-cleared">ALL CLEARED</div>}
      </div>
    </div>
  );
}

export default App;
