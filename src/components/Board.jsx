import Square from "./Square";

function Board({ board, handleClick }) {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Square
          key={index}
          value={cell}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

export default Board;