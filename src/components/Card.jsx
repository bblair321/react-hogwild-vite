import React, { useState } from "react";

function Card({ hog, onHide }) {
  const [showDetails, setShowDetails] = useState(false);

  function handleClick() {
    setShowDetails((prev) => !prev);
  }

  return (
    <div
      className="ui card"
      aria-label="hog card"
      style={{ cursor: "pointer", padding: "1em" }}
    >
      <div className="content" onClick={handleClick}>
        <h3 className="header">{hog.name}</h3>
        <img
          className="ui image"
          src={hog.image}
          alt={`Photo of ${hog.name}`}
          style={{ marginTop: "0.5em" }}
        />
      </div>

      {showDetails && (
        <div className="content">
          <p><strong>Specialty:</strong> {hog.specialty}</p>
          <p><strong>Weight:</strong> {hog.weight}</p>
          <p><strong>Greased:</strong> {hog.greased ? "Yes" : "No"}</p>
          <p><strong>Highest Medal Achieved:</strong> {hog["highest medal achieved"]}</p>
        </div>
      )}

      <div className="extra content">
        <button className="ui button" onClick={onHide}>Hide Me</button>
      </div>
    </div>
  );
}

export default Card;
