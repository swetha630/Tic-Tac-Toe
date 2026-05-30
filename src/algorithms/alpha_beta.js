export const WIN_PATTERNS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

export function checkWinner(board) {

  for (let pattern of WIN_PATTERNS) {

    const [a,b,c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return board[a];
    }
  }

  return null;
}

export function isBoardFull(board) {

  return board.every(
    cell => cell !== ""
  );
}

function minimax(
  board,
  depth,
  alpha,
  beta,
  maximizing
) {

  const winner =
    checkWinner(board);

  if (winner === "O")
    return 10 - depth;

  if (winner === "X")
    return depth - 10;

  if (isBoardFull(board))
    return 0;

  if (maximizing) {

    let maxEval = -Infinity;

    for (let i = 0; i < 9; i++) {

      if (board[i] === "") {

        board[i] = "O";

        const evalScore =
          minimax(
            board,
            depth + 1,
            alpha,
            beta,
            false
          );

        board[i] = "";

        maxEval =
          Math.max(
            maxEval,
            evalScore
          );

        alpha =
          Math.max(
            alpha,
            evalScore
          );

        if (beta <= alpha)
          break;
      }
    }

    return maxEval;

  } else {

    let minEval = Infinity;

    for (let i = 0; i < 9; i++) {

      if (board[i] === "") {

        board[i] = "X";

        const evalScore =
          minimax(
            board,
            depth + 1,
            alpha,
            beta,
            true
          );

        board[i] = "";

        minEval =
          Math.min(
            minEval,
            evalScore
          );

        beta =
          Math.min(
            beta,
            evalScore
          );

        if (beta <= alpha)
          break;
      }
    }

    return minEval;
  }
}

export function getBestMove(board) {

  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < 9; i++) {

    if (board[i] === "") {

      board[i] = "O";

      const score =
        minimax(
          board,
          0,
          -Infinity,
          Infinity,
          false
        );

      board[i] = "";

      if (score > bestScore) {

        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}