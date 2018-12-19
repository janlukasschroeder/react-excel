import { parsePhoneNumber } from "libphonenumber-js";

const ADD_COLUMN = "ADD_COLUMN";
const DELETE_COLUMN = "DELETE_COLUMN";
const ADD_ROW = "ADD_ROW";
const DELETE_ROW = "DELETE_ROW";
const UPDATE_CELL = "UPDATE_CELL";
const SET_HEADERS = "SET_HEADERS";
const SET_BODY = "SET_BODY";
const SET_TABLE = "SET_TABLE";
const VALIDATE_CELLS = "VALIDATE_CELLS";
const PARSE_CELLS = "PARSE_CELLS";

export const addColumn = after => ({ type: ADD_COLUMN, after });
export const deleteColumn = column => ({ type: DELETE_COLUMN, column });
export const addRow = after => ({ type: ADD_ROW, after });
export const deleteRow = row => ({ type: DELETE_ROW, row });
export const updateCell = (row, column, value) => ({
  type: UPDATE_CELL,
  row,
  column,
  value
});
export const setHeaders = headers => ({ type: SET_HEADERS, headers });
export const setBody = body => ({ type: SET_BODY, body });
export const setTable = rows => dispatch => {
  dispatch({ type: SET_TABLE, rows });
};
export const validateCells = () => ({ type: VALIDATE_CELLS });
export const parseCells = () => ({ type: PARSE_CELLS });

export const initialiseTable = () => dispatch => {
  dispatch(addRow());
};

const getNewCell = ({ value = "", readOnly = null, type = "text" } = {}) => {
  const cell = {
    id: Math.random(),
    type,
    value,
    readOnly: false
  };

  if (readOnly !== null) {
    cell.readOnly = readOnly;
  } else if (
    value === "Last Name" ||
    value === "First Name" ||
    value === "Mobile"
  ) {
    cell.readOnly = true;
  }

  if (value === "Mobile") {
    cell.validate = validateMobileNumber;
  }

  return cell;
};

const validateMobileNumber = number => {
  try {
    const phoneNumber = parsePhoneNumber(number, "AU");
    return phoneNumber.isValid();
  } catch (error) {
    return false;
  }
};

const initialState = {
  headers: [
    {
      id: 1,
      type: "text",
      value: "First Name",
      readOnly: true
    },
    {
      id: 2,
      type: "text",
      value: "Last Name",
      readOnly: true
    },
    {
      id: 3,
      type: "text",
      value: "Mobile",
      readOnly: true,
      validate: validateMobileNumber
    }
  ],
  rows: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLUMN:
      const { after } = action;
      const newHeader = getNewCell();
      // add new header cell to existing header row
      const headersLeft = [...state.headers].slice(0, after + 1);
      const headersRight = [...state.headers].slice(after + 1);
      const headers = [...headersLeft, newHeader, ...headersRight];
      // add new column to existing rows
      const rows = state.rows.map(row => {
        const newRowCell = getNewCell();
        const left = [...row].slice(0, after + 1);
        const right = [...row].slice(after + 1);
        const newRow = [...left, newRowCell, ...right];
        return newRow;
      });

      return { ...state, headers, rows };
    case DELETE_COLUMN: {
      const { column = 0 } = action;
      const headersLeft = [...state.headers].slice(0, column);
      const headersRight = [...state.headers].slice(column + 1);
      const headers = [...headersLeft, ...headersRight];

      const rows = state.rows.map(row => {
        const cellsLeft = [...row].slice(0, column);
        const cellsRight = [...row].slice(column + 1);
        return [...cellsLeft, ...cellsRight];
      });

      return {
        ...state,
        headers,
        rows
      };
    }
    case ADD_ROW: {
      const { after = 0 } = action;
      const newColumns = state.headers.map(h => {
        const type = "text";
        return getNewCell({ type });
      });
      const newRow = [newColumns];
      const rowsBefore = [...state.rows].slice(0, after);
      const rowsAfter = [...state.rows].slice(after);
      const rows = [...rowsBefore, ...newRow, ...rowsAfter];
      return { ...state, rows };
    }
    case DELETE_ROW: {
      const { row } = action;
      const rowsBefore = [...state.rows].slice(0, row);
      const rowsAfter = [...state.rows].slice(row + 1);
      return { ...state, rows: [...rowsBefore, ...rowsAfter] };
    }
    case UPDATE_CELL: {
      const { row, column, value } = action;

      // update cell
      if (typeof row !== "undefined") {
        const rows = JSON.parse(JSON.stringify(state.rows));
        rows[row][column].value = value;
        // const rows = state.rows.map((r, i) => {
        //   return r.map((cell, j) => {
        //     if (i === row && j === column) {
        //       cell.value = value;
        //     }
        //     return cell;
        //   });
        // });
        return { ...state, rows };
      }

      // update header
      const headers = state.headers.map((h, i) => {
        if (i === column) {
          h.value = value;
        }
        return h;
      });
      return { ...state, headers };
    }
    case SET_TABLE: {
      const { rows } = action;
      const headers = rows[0];
      const body = rows.slice(1);
      // set headers
      const newHeaders = headers.map((h, i) => getNewCell({ value: h }));
      // add First Name column if not present
      const hasFirstNameColumn = newHeaders.find(e => e.value === "First Name");
      if (!hasFirstNameColumn) {
        newHeaders.push(getNewCell({ value: "First Name", readOnly: true }));
      }
      // add Mobile column if not present
      const hasMobileColumn = newHeaders.find(e => e.value === "Mobile");
      if (!hasMobileColumn) {
        newHeaders.push(getNewCell({ value: "Mobile", readOnly: true }));
      }
      // set body
      const newRows = body.map(row => {
        const tmp = [];
        for (let i = 0; i < newHeaders.length; i++) {
          const type = "text";
          const value = row[i] || "";
          tmp.push(getNewCell({ type, value }));
        }
        return tmp;
      });

      return { ...state, headers: newHeaders, rows: newRows };
    }
    case VALIDATE_CELLS: {
      const { headers, rows } = state;
      const newRows = rows.map(row => {
        return row.map((cell, i) => {
          if (headers[i].validate) {
            const isValid = headers[i].validate(cell.value);
            const updatedCell = { ...cell };
            updatedCell.errors = isValid ? [] : ["Number not valid"];
            return updatedCell;
          }
          return cell;
        });
      });
      return { ...state, rows: newRows };
    }
    case PARSE_CELLS: {
      const { headers, rows } = state;
      const newRows = rows.map(row => {
        return row.map((cell, i) => {
          if (
            headers[i].parse &&
            Array.isArray(cell.errors) &&
            cell.errors.length === 0
          ) {
            const updatedCell = JSON.parse(JSON.stringify(cell));
            updatedCell.value = headers[i].parse(updatedCell.value);
            return updatedCell;
          }
          return cell;
        });
      });
      return { ...state, rows: newRows };
    }
    default:
      return state;
  }
};
