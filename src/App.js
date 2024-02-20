import React, { useState } from "react";
import X from "./img/X.png";
import O from "./img/0.png";

const initialState = {
  board: Array(9).fill(null),
  whoNext: true,
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (!squares.includes(null)) {
    return "end";
  }
  return null;
};

const App = () => {
  const [state, setState] = useState(initialState);

  const handleClick = (i) => {
    const { board, whoNext } = state;
    const squares = [...board];
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = whoNext ? "X" : "O";
    setState({
      board: squares,
      whoNext: !whoNext,
    });
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {state.board[i] ? (
        <img src={state.board[i] === "X" ? X : O} alt="" />
      ) : (
        ""
      )}
    </button>
  );

  const winner = calculateWinner(state.board);
  let status;
  if (winner && winner !== "end") {
    status = "Победитель: " + winner;
  } else if (winner !== "end") {
    status = "Следующий игрок: " + (state.whoNext ? "X" : "O");
  } else {
    status = "Ничья";
  }

  return (
    <div className="game">
      <button
        className="button--refresh"
        onClick={() => {
          setState(initialState);
        }}
      >
        Заново
      </button>
      <div className="game__board">
        <div className="game__board__row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="game__board__row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="game__board__row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game__info">{status}</div>
    </div>
  );
};

export default App;
