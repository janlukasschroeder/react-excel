import { combineReducers } from "redux";
import table from "./table.reducer";

export default combineReducers({
  table
});

export * from "./table.reducer";
