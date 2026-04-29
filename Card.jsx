import { useState } from "react";
import "./Card.css";

function Card({ term, definition, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
    className="card-container"
    onClick={() => setFlipped(!flipped)}
    style={{
    zIndex: flipped ? 100 : 1
  }} >

    <div className={`card ${flipped ? "flipped" : ""}`}>
        
    <div className="card-front">
      {term}

    <button
    onClick={(e) => {
      e.stopPropagation();
      onDelete();
    }}

    style={{
      position: "absolute",
      top: "5px",
      right: "5px",
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer"
    }} >
    X
  </button>
      </div>



        <div className="card-back">
          {definition}
        </div>
      </div>
    </div>
  );
}

export default Card;