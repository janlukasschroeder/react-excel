import React from "react";
import Cell from "./Cell";
import { connect } from "react-redux";

class Headers extends React.Component {
  render() {
    return (
      <div className={"header"}>
        {this.props.headers.map((cell, j) => (
          <div className={"header-cell-wrapper"} key={cell.id}>
            <Cell {...cell} isHeader column={j} />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ table }) => ({
  headers: table.headers
});

export default connect(
  mapStateToProps,
  null
)(Headers);
