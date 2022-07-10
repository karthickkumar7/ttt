import { useState, useEffect } from "react";

const TicTacToe = () => {
  const [cells, setCells] = useState([]);
  const [filledCells, setFilledCells] = useState([]);
  const [x, setX] = useState([]);
  const [o, setO] = useState([]);
  const [emptyCells, setEmptyCells] = useState([]);
  const [turn, setTurn] = useState(true);
  const [p1Win, setP1Win] = useState(false);
  const [cWin, setCWin] = useState(false);
  const [p1, setP1] = useState({ w: 0, l: 0 });
  const [p2, setP2] = useState({ w: 0, l: 0 });

  const [moves, setMoves] = useState([]);

  const WIN_POSITIONS = {
    //r1
    "00": [
      ["00", "01", "02"],
      ["00", "10", "20"],
      ["00", "11", "22"],
    ],
    "01": [
      ["00", "01", "02"],
      ["01", "11", "21"],
    ],
    "02": [
      ["00", "01", "02"],
      ["02", "12", "22"],
      ["02", "11", "20"],
    ],
    // r2
    10: [
      ["00", "10", "20"],
      ["10", "11", "12"],
    ],
    11: [
      ["00", "11", "22"],
      ["02", "11", "20"],
      ["10", "11", "12"],
      ["01", "11", "21"],
    ],
    12: [
      ["02", "12", "22"],
      ["10", "11", "12"],
    ],
    // r3
    20: [
      ["20", "21", "22"],
      ["00", "10", "20"],
      ["20", "11", "02"],
    ],
    21: [
      ["20", "21", "22"],
      ["01", "11", "21"],
    ],
    22: [
      ["20", "21", "22"],
      ["02", "12", "22"],
      ["00", "11", "22"],
    ],
  };

  const createCells = () => {
    const cells = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (r === 0 && c === 0) {
          cells.push(
            <div className="h-[100px] w-[100px]" id={`${r}${c}`}></div>
          );
        } else if (r === 0 && c === 2) {
          cells.push(
            <div className="h-[100px] w-[100px]" id={`${r}${c}`}></div>
          );
        } else if (r === 2 && c === 0) {
          cells.push(
            <div className="h-[100px] w-[100px]" id={`${r}${c}`}></div>
          );
        } else if (r === 2 && c === 2) {
          cells.push(
            <div className="h-[100px] w-[100px]" id={`${r}${c}`}></div>
          );
        } else if ((r === 0 && c === 1) || (r === 2 && c === 1)) {
          cells.push(
            <div
              className="h-[100px] w-[100px] border-x border-white"
              id={`${r}${c}`}
            ></div>
          );
        } else if ((r === 1 && c === 0) || (r === 1 && c === 2)) {
          cells.push(
            <div
              className="h-[100px] w-[100px] border-y border-white"
              id={`${r}${c}`}
            ></div>
          );
        } else
          cells.push(
            <div
              className="h-[100px] w-[100px] border border-white"
              id={`${r}${c}`}
            ></div>
          );
      }
    }
    setCells(cells);
    setEmptyCells(cells);
  };

  const comChoice = () => {
    emptyCells();
  };

  const chooseCell = (e, c) => {
    if (filledCells.includes(e.target.id)) return;

    let choseCell;
    const newCells = cells.map((cell) => {
      if (e.target.id === cell.props.id) {
        choseCell = cell.props.id;
        return (
          <div
            className={`${cell.props.className} flex justify-center items-center text-3xl font-bold text-gray-200`}
            id={cell.props.id}
          >
            {turn ? "X" : "O"}
          </div>
        );
      }
      return cell;
    });
    if (turn) setX([choseCell, ...x]);
    else setO([choseCell, ...o]);
    setCells(newCells);
    setEmptyCells(newCells);
    setFilledCells([choseCell, ...filledCells]);
    setTurn((pv) => !pv);
  };

  const checkForWin = (pPos, cpos, winPos) => {
    for (let i = 0; i < winPos.length; i++) {
      if (winPos[i].every((p) => pPos.includes(p))) {
        setP1Win(true);
        setP1({ ...p1, w: p1.w + 1 });
        setP2({ ...p2, l: p2.l + 1 });
      }
      if (winPos[i].every((p) => cpos.includes(p))) {
        setCWin(true);
        setP1({ ...p1, l: p1.l + 1 });
        setP2({ ...p2, w: p2.w + 1 });
      }
    }
  };

  const reset = () => {
    setCells([]);
    setEmptyCells([]);
    setFilledCells([]);
    setX([]);
    setO([]);
    createCells();
    setTurn(true);
    setP1Win(false);
    setCWin(false);
  };

  useEffect(() => {
    createCells();
  }, []);

  useEffect(() => {
    const newEmptyCells = emptyCells.filter(
      (cell) => !filledCells.includes(cell.props.id)
    );
    setEmptyCells(newEmptyCells);

    filledCells.length && checkForWin(x, o, WIN_POSITIONS[filledCells[0]]);
  }, [filledCells]);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-black relative">
      {p1Win && (
        <h1 className="my-2 text-2xl text-gray-200 animate-bounce">
          Player 1 won
        </h1>
      )}
      {cWin && (
        <h1 className="my-2 text-2xl text-gray-200 animate-bounce">
          Player 2 won
        </h1>
      )}
      {!(p1Win || cWin) && turn ? (
        <h1 className="text-2xl font-semibold text-blue-600">P1's turn</h1>
      ) : (
        <h1 className="text-2xl font-semibold text-red-600">P2's turn</h1>
      )}
      <div className="h-[300px] w-[303px] my-2 flex flex-wrap">
        {cells.map((cell) => (
          <div
            key={cell.props.id}
            onClick={(e) => chooseCell(e, cell)}
            className={`${
              filledCells.includes(cell.props.id)
                ? "cursor-not-allowed"
                : "hover:bg-slate-800 cursor-pointer"
            } duration-500 `}
          >
            {cell}
          </div>
        ))}
      </div>
      {!"" && (
        <button
          className="my-2 p-2 border-yellow-300 border text-yellow-300 rounded w-[200px]"
          onClick={reset}
        >
          Reset
        </button>
      )}
      <div className="h-[230px] w-[230px] flex justify-evenly text-white absolute right-[600px]">
        <table>
          <thead>
            <tr className="">
              <th> </th>
              <th>Wins </th>
              <th>Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className="text-gray-300">player 1</td>
              <td className="text-green-300 text-xl">{p1.w}</td>
              <td className="text-red-400 text-xl">{p1.l}</td>
            </tr>
            <tr>
              <td className="text-gray-300">player 2</td>
              <td className="text-green-300 text-xl">{p2.w}</td>
              <td className="text-red-400 text-xl">{p2.l}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicTacToe;
