import React from 'react';

interface ScoreBoardProps {
  totalScore: number;
  roundScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ totalScore, roundScore }) => {
  return (
    <div className="score-board">
      <p>Total Score: <span>{totalScore}</span></p>
      <p>Round Score: <span>{roundScore}</span></p>
    </div>
  );
};

export default ScoreBoard;
