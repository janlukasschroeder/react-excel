import React from "react";
import { connect } from "react-redux";
import UncontrolledCell from "./CellUncontrolled";

import {
  addColumn,
  deleteColumn,
  addRow,
  deleteRow,
  updateCell
} from "../../reducers";

class Cell extends React.Component {
  state = { lastKey: null, mouseOver: false };

  constructor(props) {
    super(props);
    this.onTab = this.onTab.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const value = e.target.value;
    if (this.props.onCellChange) {
      this.props.onCellChange(this.props.row, this.props.column, value);
    }
  }

  onTab() {
    if (this.props.isLastCell) {
      this.props.onAddRow(this.props.row + 1);
    }
  }

  onKeyDown(e) {
    if (e.key === "Tab" && this.state.lastKey !== "Shift") {
      this.onTab();
    }
    this.setState({ lastKey: e.key });
  }

  onMouseEnter(e) {
    this.setState({ mouseOver: true });
  }

  onMouseLeave(e) {
    this.setState({ mouseOver: false });
  }

  render() {
    const {
      column,
      row,
      onAddColumn,
      onDeleteColumn,
      onAddRow,
      onDeleteRow,
      readOnly,
      value,
      id,
      type,
      errors,
      isHeader
    } = this.props;
    const { mouseOver } = this.state;
    const showAddColumnBtn = onAddColumn && mouseOver && isHeader;
    const showDeleteColumnBtn =
      onDeleteColumn && !readOnly && mouseOver && isHeader;
    const showAddRowBtn = false && onAddRow && mouseOver && column === 0;
    const showDeleteRowBtn =
      onDeleteRow && mouseOver && column === 0 && !isHeader;
    const hasErrors = Array.isArray(errors) && errors.length > 0;

    return (
      <div
        key={"cell" + id}
        className={"cell " + (hasErrors ? "has-errors" : "")}
        onKeyDown={this.onKeyDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {type === "text" && (
          <UncontrolledCell
            id={id}
            readOnly={readOnly}
            value={value}
            onChange={this.onChange}
          />
        )}

        {showAddColumnBtn && (
          <AddColumn column={column} onAddColumn={onAddColumn} />
        )}
        {showDeleteColumnBtn && (
          <DeleteColumn onDeleteColumn={onDeleteColumn} column={column} />
        )}
        {showDeleteRowBtn && <DeleteRow onDeleteRow={onDeleteRow} row={row} />}
        {showAddRowBtn && <AddRow />}
      </div>
    );
  }
}

const mapDispatchToProps = {
  onAddColumn: addColumn,
  onAddRow: addRow,
  onDeleteColumn: deleteColumn,
  onDeleteRow: deleteRow,
  onCellChange: updateCell
};

export default connect(
  null,
  mapDispatchToProps
)(Cell);

const DeleteRow = ({ onDeleteRow, row }) => (
  <div className={"delete-row"} onClick={() => onDeleteRow(row)}>
    <IconTimes />
  </div>
);

const DeleteColumn = ({ onDeleteColumn, column }) => (
  <div className={"delete-column"} onClick={() => onDeleteColumn(column)}>
    <IconTimes />
  </div>
);

const AddRow = ({ onAddRow, row }) => (
  <>
    <div className={"add-row add-row-before"}>B+</div>
    <div className={"add-row add-row-after"}>Af+</div>
  </>
);

const AddColumn = ({ onAddColumn, column }) => (
  <>
    <div
      className={"add-column add-column-before"}
      onClick={() => onAddColumn(column - 1)}
    >
      <IconPlus />
    </div>
    <div
      className={"add-column add-column-after"}
      onClick={() => onAddColumn(column)}
    >
      <IconPlus />
    </div>
  </>
);

const IconPlus = () => <>+</>;
const IconTimes = () => <>x</>;
