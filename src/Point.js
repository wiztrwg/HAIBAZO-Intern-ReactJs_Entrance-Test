import React from "react";

function Point({ id, x, y, onClick }) {
  return (
    <div
      className="point"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={() => onClick(id)}
    >
      {id}
    </div>
  );
}

export default Point;
