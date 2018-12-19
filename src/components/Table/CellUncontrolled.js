import React from "react";

export default class TableCellUncontrolled extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  onChange({ target: { value } }) {
    this.setState({ value });
  }

  onBlur(e) {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const readOnlyClass = this.props.readOnly ? "read-only" : "editable";

    return (
      <div key={this.props.id} className={readOnlyClass}>
        <input
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)}
          value={this.state.value}
          readOnly={this.props.readOnly}
          disabled={this.props.readOnly}
        />
      </div>
    );
  }
}
