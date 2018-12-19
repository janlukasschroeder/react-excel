import React from "react";
import TableWrapper from "./components/TableWrapper";
import { Provider } from "react-redux";
import configStore from "./store";

import "./styles.css";

const store = configStore();
const render = () => (
  <Provider store={store}>
    <TableWrapper />
  </Provider>
);

export default render;
