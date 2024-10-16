import React from "react";
import "./DiceDisplay.css";

interface DiceDisplayProps {
  dice: number[];
  heldDice: boolean[];
  onHold: (index: number) => void;
}

const DiceDisplay: React.FC<DiceDisplayProps> = ({ dice, heldDice, onHold }) => {
  return (
    <div className="dice-display">
      {dice.map((die, index) => (
        <div
          key={index}
          className={`die die-${die} ${heldDice[index] ? "held" : ""}`} 
          onClick={() => onHold(index)}
        >
          <div className="dot-container">
            {[...Array(die)].map((_, dotIndex) => (
              <div key={dotIndex} className={`dot dot-${dotIndex + 1}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiceDisplay;
