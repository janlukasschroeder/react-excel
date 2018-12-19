import React from "react";
import { connect } from "react-redux";
import Headers from "./Headers";
import Body from "./Body";
import ExcelFileInput from "../ExcelFileInput";

import { addRow, validateCells } from "../../reducers";

class Table extends React.Component {
  render() {
    const { addRow, validateCells } = this.props;
    return (
      <div>
        <div className={"btn-bar"}>
          <div>
            <button onClick={() => addRow()}>Add Row</button>
            <button onClick={() => validateCells()}>Validate Table</button>
            <ExcelFileInput />
          </div>
        </div>
        <div className={"table-wrapper"}>
          <div className={"table"}>
            <Headers />
            <Body />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addRow,
  validateCells
};

export default connect(
  null,
  mapDispatchToProps
)(Table);
