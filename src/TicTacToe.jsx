import { useState, useEffect, useMemo, useRef } from "react";
import RowCell from "./RowCell";
import { getHeaderText, getWinner, winCombo } from "./utils";
import "./ticTacToe.css";

const TicTacToe = () => {
  const [currentPlayer, setCurrentPlayer] = useState(true);
  const [logicCell, setLogicCell] = useState(Array(9).fill(""));
  const [history, setHistory] = useState([]);
  const [scoreBoard, setScoreBoard] = useState({ player1: 0, player2: 0 });
  const hasScored = useRef(false);

  const checkWinner = getWinner(winCombo, logicCell);

  const reset = (setLogicCell, setCurrentPlayer, setHistory, hasScored) => {
    setLogicCell(Array(9).fill(""));
    setCurrentPlayer(true);
    setHistory([]);
    hasScored.current = false;
  };

  useEffect(() => {
    if (!checkWinner?.currentCell || hasScored.current) {
      return;
    }
    hasScored.current = true;
    setScoreBoard((prev) => {
      if (checkWinner.currentCell === "X") {
        return {
          ...prev,
          player1: prev.player1 + 1,
        };
      }
      return {
        ...prev,
        player2: prev.player2 + 1,
      };
    });
  }, [checkWinner]);
  return (
    <div className="tic-tac-toe">
      <section id="scoreboard">
        <div className="scoreboard-content">
          <span className="score-title">SCORE</span>
          <span>Player 1: {scoreBoard.player1}</span>
          <div className="vertical-line" />
          <span>Player 2: {scoreBoard.player2}</span>
        </div>
      </section>
      <section id="playerHeader" className="player-header">
        {getHeaderText(
          checkWinner?.winnerCombo,
          currentPlayer,
          checkWinner?.currentCell,
          history,
        )}
      </section>
      {[1, 2, 3].map((row) => {
        return (
          <section key={row} className="top-row">
            {[1, 2, 3].map((rowCel) => {
              const cellNumber = (row - 1) * 3 + (rowCel - 1);
              const isWinnderCell =
                checkWinner?.currentCell &&
                checkWinner?.winnerCombo.includes(cellNumber);
              return (
                <RowCell
                  key={rowCel}
                  currentPlayer={currentPlayer}
                  setCurrentPlayer={setCurrentPlayer}
                  logicCell={logicCell}
                  setLogicCell={setLogicCell}
                  isWinnerCell={isWinnderCell}
                  isPlayable={!checkWinner?.currentCell}
                  setHistory={setHistory}
                  row={row}
                  col={rowCel}
                  cellNumber={cellNumber}
                />
              );
            })}
          </section>
        );
      })}
      <section id="interactButton" className="interact-buttons">
        <span>
          <button
            disabled={history.length === 9 || checkWinner?.winnerCombo}
            onClick={() => {
              if (history.length > 0) {
                const lastVisited = history.at(-1);
                setHistory((prev) => prev.slice(0, -1));
                setLogicCell((prev) =>
                  prev.map((ele, index) =>
                    index === lastVisited.cellNumber ? "" : ele,
                  ),
                );
                setCurrentPlayer((prev) => !prev);
              }
            }}
          >
            UNDO
          </button>
        </span>
        <span>
          <button
            onClick={() =>
              reset(setLogicCell, setCurrentPlayer, setHistory, hasScored)
            }
          >
            RESET
          </button>
        </span>
      </section>
       <button
        className="reset-scoreboard-button"
        onClick={() => {
          reset(setLogicCell, setCurrentPlayer, setHistory, hasScored);
          setScoreBoard({ player1: 0, player2: 0 });
        }}
      >
        RESET SCOREBOARD
      </button>
      <section id="history">
        <h3 className="history-title">History</h3>
        <div
          className="history-list"
        >
          {history?.length > 0 &&
            history?.map((hist) => {
              return (
                <span key={hist.cellNumber + hist.mark}>
                  Player <b>{hist.player}</b> marks <b>{hist.mark}</b> to Cell{" "}
                  <b>{hist.cellNumber}</b> at row <span>{hist.row}</span> and
                  column <span>{hist.col}</span>
                </span>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default TicTacToe;
