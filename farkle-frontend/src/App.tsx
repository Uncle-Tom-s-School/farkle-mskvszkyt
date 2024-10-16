import React, { useState } from "react";
import DiceDisplay from "./components/DiceDisplay";
import ScoreBoard from "./components/ScoreBoard";
import Controls from "./components/Controls";
import "./index.css";

const App: React.FC = () => {
  const [dice, setDice] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [score, setScore] = useState<number>(0);
  const [roundScore, setRoundScore] = useState<number>(0);
  const [message, setMessage] = useState<string>("Start rolling!");
  const [heldDice, setHeldDice] = useState<boolean[]>(Array(6).fill(false));
  const [keptDice, setKeptDice] = useState<number[]>([]);

  const rollDice = () => {
    const newDice = dice.map((die, index) =>
      heldDice[index] ? die : Math.floor(Math.random() * 6) + 1
    );
    setDice(newDice);
    setMessage(`You rolled: ${newDice.join(" - ")}`);
    updateRoundScore(heldDice, newDice); // Check the round score after rolling
  };

  const holdDie = (index: number) => {
    setHeldDice((prev) => {
      const newHeldDice = [...prev];
      newHeldDice[index] = !newHeldDice[index]; // Toggle the held status
      return newHeldDice;
    });

    // Update keptDice based on heldDice
    setKeptDice((prevKeptDice) => {
      const dieValue = dice[index];
      if (heldDice[index]) {
        // If it's already held, unhold it and remove from keptDice
        return prevKeptDice.filter((keptDie) => keptDie !== dieValue);
      } else {
        // If it's being held, add it to keptDice
        return [...prevKeptDice, dieValue];
      }
    });
  };

  const updateRoundScore = (heldDice: boolean[], dice: number[]) => {
    const currentRoundScore = calculateScore(dice.filter((_, index) => heldDice[index]));

    setRoundScore(currentRoundScore);

    // Check if the current round score is 0 and if there are no held dice
    if (currentRoundScore === 0 && heldDice.some((held) => held)) {
      alert(`Game Over! Your final score is ${score}.`);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setRoundScore(0);
    setDice([1, 2, 3, 4, 5, 6]);
    setMessage("Game reset. Start rolling!");
    setHeldDice(Array(6).fill(false));
    setKeptDice([]);
  };

  const calculateScore = (keptDice: number[]): number => {
    const counts = Array(7).fill(0);
    keptDice.forEach((die) => counts[die]++);

    let score = 0;

    for (let i = 1; i <= 6; i++) {
      if (counts[i] >= 3) {
        let tempScore = i * 100;
        if (i === 1) {
          tempScore = 1000;
        }
        for (let multiplier = 1; multiplier <= counts[i] - 2; multiplier++) {
          tempScore *= multiplier;
        }
        score += tempScore;
        counts[i] = 0; // Reset count after scoring
      }
    }

    score += counts[1] * 100;
    score += counts[5] * 50;

    return score;
  };

  return (
    <div className="app">
      <h1>Farkle Game</h1>
      <div className="table">
        <DiceDisplay dice={dice} heldDice={heldDice} onHold={holdDie} />
      </div>
      <ScoreBoard totalScore={score} roundScore={roundScore} />
      <Controls onRoll={rollDice} onReset={resetGame} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
