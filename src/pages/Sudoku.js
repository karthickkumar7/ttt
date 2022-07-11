import { useState, useEffect } from "react";

import { positions, board } from "./sudokuLogic";

// const board = [
//   ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//   ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//   [".", "9", "8", ".", ".", ".", ".", "6", "."],
//   ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//   ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//   ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//   [".", "6", ".", ".", ".", ".", "2", "8", "."],
//   [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//   [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];

const Sudoku = () => {
  const [cells, setCells] = useState([]);
  const [inputboard, setInputBoard] = useState([]);
  const [complete, setComplete] = useState(false);

  const solve = () => {
    let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const pos = {};

    for (let i = 0; i < cells.length; i++) {
      if (!cells[i].props.children) {
        for (let j = 0; j < positions[cells[i].props.id].length; j++) {
          for (let k = 0; k < positions[cells[i].props.id][j].length; k++) {
            let arb = [];
            for (let l = 0; l < cells.length; l++) {
              if (
                positions[cells[i].props.id][j].includes(cells[l].props.id) &&
                cells[l].props.children
              ) {
                arb.push(cells[l].props.children);
              }
            }

            nums = nums.filter((n) => !arb.includes(n));
            break;
          }
          pos[cells[i].props.id] = nums;
        }
      }
      nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    }

    // third
    // console.log(pos);

    const newCells = cells.map((c) => {
      if (pos[c.props.id] && pos[c.props.id].length === 1) {
        return (
          <div
            className="h-[30px] w-[30px] border border-black text-red-600 flex justify-center items-center"
            id={c.props.id}
          >
            {pos[c.props.id][0]}
          </div>
        );
      }
      return c;
    });

    setCells(newCells);
  };

  const createCells = (bd) => {
    const createdCells = [];
    for (let r = 0; r < bd.length; r++) {
      for (let c = 0; c < bd[r].length; c++) {
        createdCells.push(
          <div
            className="h-[30px] w-[30px] border border-black border-b border-gray flex justify-center items-center"
            id={`${r}${c}`}
          >
            {bd[r][c] !== "." ? bd[r][c] : ""}
          </div>
        );
      }
    }
    // setCells(createdCells);
    return createdCells;
  };

  const reset = () => {
    setInputBoard(createCells(board));
  };

  const setValueOfCell = (val, cell) => {
    if (val.length > 1 || isNaN(Number(val))) return;
    if (Number(val) > 9) return;

    const newInputBoard = inputboard.map((el) => {
      if (el.props.id === cell.props.id) {
        return (
          <div
            className="h-[30px] w-[30px] border border-black flex justify-center items-center"
            id={el.props.id}
          >
            {val}
          </div>
        );
      }
      return el;
    });
    setInputBoard(newInputBoard);
  };

  // const run = (id, cll) => {
  //   for (let i = 0; i < positions[cll].length; i++) {
  //     if (positions[cll][i].includes(id)) return true;
  //   }
  // };

  useEffect(() => {
    if (!complete) {
      setInputBoard(createCells(board));
      return () => {};
    } else {
      console.log("ran");
      setCells(inputboard);
    }
  }, [complete]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {complete ? (
        <div className="h-full w-full flex flex-col  justify-center items-center">
          <div className="h-[270px] w-[270px] flex flex-wrap">
            {cells.map((cell) => (
              <div key={cell.props.id}>{cell}</div>
            ))}
          </div>
          <button
            className="my-4 p-2 rounded bg-blue-600 text-white"
            onClick={solve}
          >
            Solve
          </button>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col  justify-center items-center">
          <div className="h-[270px] w-[270px] flex flex-wrap">
            {inputboard.map((cell, i) => (
              <input
                key={cell.props.id}
                className="h-[30px] w-[30px] border border-black outline-none flex justify-center items-center"
                value={cell.props.children}
                onChange={(e) => setValueOfCell(e.target.value, cell)}
              />
            ))}
          </div>
          <div>
            <button
              className="my-4 mx-2 p-2 rounded bg-blue-600 text-white"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="my-4 p-2 rounded bg-green-600 text-white"
              onClick={() => setComplete((pv) => !pv)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sudoku;

// onChange={(e) => setInputBoard(() => setValueOfCell(e, cell))}
// value={cell.props.children}
