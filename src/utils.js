export const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

export const getHeaderText = (
  winnerCombo,
  currentPlayer,
  currentCell,
  history,
) => {
  if (!winnerCombo && history.length === 9) {
    return "It's a draw";
  } else {
    if (winnerCombo?.length === 3 && currentCell) {
      return `${currentCell} Wins!!!!`;
    } else if (currentPlayer)
      return "It's player 1's move to mark X on the board";
    else return "It's player 2's move to mark O on the board";
  }
};

export const getWinner = (winCombo, logicCell) => {
  for (const combo of winCombo) {
    const [a, b, c] = combo;

    if (
      logicCell[a] &&
      logicCell[a] === logicCell[b] &&
      logicCell[a] === logicCell[c]
    ) {
      return {
        currentCell: logicCell[a],
        winnerCombo: combo,
      };
    }
  }

  return null;
};
