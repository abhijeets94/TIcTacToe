const RowCell = ({
  currentPlayer,
  setCurrentPlayer,
  logicCell,
  setLogicCell,
  isWinnerCell,
  isPlayable,
  setHistory,
  row,
  col,
  cellNumber,
}) => {
  const onPlayerMove = () => {
    if (!["X", "O"].includes(logicCell[cellNumber]) && isPlayable) {
      setCurrentPlayer((prev) => !prev);
      setLogicCell((prev) => {
        const newP = [...prev];
        newP[cellNumber] = currentPlayer ? "X" : "O";
        return [...newP];
      });
      setHistory((prev) => [
        ...prev,
        {
          cellNumber,
          mark: currentPlayer ? "X" : "O",
          player: currentPlayer ? 1 : 2,
          row,
          col,
        },
      ]);
    }
  };

  return (
    <button
      className={`row-cell${isWinnerCell ? " winner" : ""}`}
      onClick={onPlayerMove}
    >
      {`${logicCell[cellNumber] ?? ""}`}
    </button>
  );
};

export default RowCell;
