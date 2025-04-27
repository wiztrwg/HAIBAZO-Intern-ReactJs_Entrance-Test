import React, { useState, useEffect } from "react";
import "./App.css";
import Point from "./Point";

function App() {
  const [points, setPoints] = useState([]);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [numPoints, setNumPoints] = useState(10);
  const [currentPoint, setCurrentPoint] = useState(1);
  const [allCleared, setAllCleared] = useState(false);

  const generatePoints = (num) => {
    const newPoints = [];
    for (let i = 1; i <= num; i++) {
      newPoints.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
      });
    }
    setPoints(newPoints);
    setGameOver(false);
    setTime(0);
    setAllCleared(false);
    setCurrentPoint(1);
  };

  useEffect(() => {
    if (started) {
      generatePoints(numPoints);
    }
  }, [started]);

  useEffect(() => {
    let timer;
    if (!gameOver && started) {
      timer = setInterval(() => {
        setTime((prev) => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameOver, started]);

  const handleClick = (id) => {
    if (id === currentPoint) {
      const newPoints = points.filter((point) => point.id !== id);
      setPoints(newPoints);
      setCurrentPoint(currentPoint + 1);

      if (newPoints.length === 0) {
        setAllCleared(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const handleStart = () => {
    if (numPoints > 0) {
      setStarted(true);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setPoints([]);
    setTime(0);
    setGameOver(false);
    setAllCleared(false);
    setCurrentPoint(1);
  };

  const handleNumPointsChange = (e) => {
    setNumPoints(Number(e.target.value));
  };

  return (
    <div className="App">
      <h1>LET'S PLAY</h1>
      <div className="info">
        <p>Points left: {points.length}</p>
        <p>Time: {time.toFixed(1)}s</p>

        {!started && !gameOver && (
          <>
            <input
              type="number"
              value={numPoints}
              onChange={handleNumPointsChange}
              placeholder="Enter number of points"
              min="1"
            />
          </>
        )}

        {!gameOver && !started ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleRestart}>Restart</button>
        )}
      </div>

      <div className="container">
        {points.map((point) => (
          <Point
            key={point.id}
            id={point.id}
            x={point.x}
            y={point.y}
            onClick={handleClick}
          />
        ))}
        {allCleared && <div className="all-cleared">ALL CLEARED</div>}
        {gameOver && !allCleared && <div className="game-over">GAME OVER</div>}
      </div>
    </div>
  );
}

export default App;
