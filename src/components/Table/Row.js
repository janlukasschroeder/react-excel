import React from "react";
import Cell from "./Cell";

const Row = ({ row, cells, isLastRow }) => {
  return (
    <div className={"row"}>
      {cells.length
        ? cells.map((cell, j) => (
            <Cell
              {...cell}
              column={j}
              row={row}
              key={`${row}-${j}`}
              isLastCell={isLastRow && j === cells.length - 1}
            />
          ))
        : "..."}
    </div>
  );
};

export default Row;
