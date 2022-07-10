import { useState, useEffect } from "react";

const CELLS = [
  "r0c0",
  "r0c1",
  "r0c2",
  "r0c3",
  "r0c4",
  "r0c5",
  "r0c6",
  "r0c7",
  "r1c0",
  "r1c1",
  "r1c2",
  "r1c3",
  "r1c4",
  "r1c5",
  "r1c6",
  "r1c7",
  "r2c0",
  "r2c1",
  "r2c2",
  "r2c3",
  "r2c4",
  "r2c5",
  "r2c6",
  "r2c7",
  "r3c0",
  "r3c1",
  "r3c2",
  "r3c3",
  "r3c4",
  "r3c5",
  "r3c6",
  "r3c7",
  "r4c0",
  "r4c1",
  "r4c2",
  "r4c3",
  "r4c4",
  "r4c5",
  "r4c6",
  "r4c7",
  "r5c0",
  "r5c1",
  "r5c2",
  "r5c3",
  "r5c4",
  "r5c5",
  "r5c6",
  "r5c7",
  "r6c0",
  "r6c1",
  "r6c2",
  "r6c3",
  "r6c4",
  "r6c5",
  "r6c6",
  "r6c7",
  "r7c0",
  "r7c1",
  "r7c2",
  "r7c3",
  "r7c4",
  "r7c5",
  "r7c6",
  "r7c7",
];

const BLACK_CELLS = [
  "r0c1",
  "r0c3",
  "r0c5",
  "r0c7",
  "r1c0",
  "r1c2",
  "r1c4",
  "r1c6",
  "r2c1",
  "r2c3",
  "r2c5",
  "r2c7",
  "r3c0",
  "r3c2",
  "r3c4",
  "r3c6",
  "r4c1",
  "r4c3",
  "r4c5",
  "r4c7",
  "r5c0",
  "r5c2",
  "r5c4",
  "r5c6",
  "r6c1",
  "r6c3",
  "r6c5",
  "r6c7",
  "r7c0",
  "r7c2",
  "r7c4",
  "r7c6",
];

const PAWN = {
  movement: 1,
  path: {},
};

const Chess = () => {
  const [cells, setCells] = useState([]);

  const createCells = () => {
    const cls = CELLS.map((c) => (
      <div
        className="h-[100px] w-[100px] flex justify-center items-center"
        id={c}
      >
        {c === "r1c0" && (
          <div className="h-[70px] w-[70px] flex justify-center items-center bg-white rounded-full text-black cursor-pointer">
            P
          </div>
        )}
      </div>
    ));

    setCells(cls);
  };

  useEffect(() => {
    createCells();
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-200">
      <div className="h-[800px] w-[800px] flex flex-wrap bg-slate-300">
        {cells.map((c) => (
          <div
            key={c.props.id}
            className={`${BLACK_CELLS.includes(c.props.id) && "bg-gray-700"}`}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chess;
