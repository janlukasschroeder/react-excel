import React from "react";
import { connect } from "react-redux";
import Row from "./Row";

import { addRow } from "../../reducers";

class Body extends React.Component {
  render() {
    const { rows } = this.props;
    return (
      <div className={"body"}>
        {rows.length &&
          rows.map((cells, i) => (
            <Row
              cells={cells}
              row={i}
              key={"row-" + i}
              isLastRow={i === rows.length - 1}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ table }) => ({
  rows: table.rows
});

const mapDispatchToProps = {
  addRow
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
