import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

import {
  checkWinner,
  getBestMove,
  isBoardFull
} from "./algorithms/alpha_beta";

function App() {

  const [board, setBoard] = useState(
    Array(9).fill("")
  );

  const [status, setStatus] =
    useState("Your Turn");

  const handleClick = (index) => {

    if (board[index] !== "")
      return;

    if (checkWinner(board))
      return;

    const newBoard = [...board];

    newBoard[index] = "X";

    setBoard(newBoard);

    const winner = checkWinner(newBoard);

    if (winner === "X") {

      setStatus("You Win!");
      return;
    }

    if (isBoardFull(newBoard)) {

      setStatus("Draw!");
      return;
    }

    setStatus("AI Thinking...");

    setTimeout(() => {

      const aiBoard = [...newBoard];

      const bestMove =
        getBestMove(aiBoard);

      if (bestMove !== -1) {

        aiBoard[bestMove] = "O";

        setBoard(aiBoard);

        const aiWinner =
          checkWinner(aiBoard);

        if (aiWinner === "O") {

          setStatus("AI Wins!");
        }
        else if (
          isBoardFull(aiBoard)
        ) {

          setStatus("Draw!");
        }
        else {

          setStatus("Your Turn");
        }
      }

    }, 500);
  };

  const restartGame = () => {

    setBoard(Array(9).fill(""));
    setStatus("Your Turn");
  };

  return (

    <div className="container">

      <h1>AI Tic Tac Toe</h1>

      <h2>{status}</h2>

      <Board
        board={board}
        handleClick={handleClick}
      />

      <button
        className="restart"
        onClick={restartGame}
      >
        Restart Game
      </button>

    </div>
  );
}

export default App;