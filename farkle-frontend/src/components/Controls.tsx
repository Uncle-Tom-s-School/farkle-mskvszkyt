import React from 'react';

interface ControlsProps {
  onRoll: () => void;
  onReset: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onRoll, onReset }) => {
  return (
    <div className="controls">
      <button onClick={onRoll}>Roll Dice</button>
      <button onClick={onReset}>Reset Game</button>
    </div>
  );
};

export default Controls;
