import React from "react";
import ReactDOM from "react-dom";
import TableWrapper from "./components/TableWrapper";
import { Provider } from "react-redux";
import configStore from "./store";

import "./styles.css";

const store = configStore();
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <TableWrapper />
  </Provider>,
  rootElement
);
