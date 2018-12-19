import React from "react";
import { connect } from "react-redux";

class SelectSurvey extends React.Component {
  render() {
    const { surveys } = this.props;
    if (!Array.isArray(surveys) || surveys.length === 0) {
      return "No surveys created.";
    }

    return (
      <select
        onChange={this.props.onChange}
        defaultValue={this.props.defaultValue}
      >
        {surveys.map(survey => (
          <Option label={survey.name} value={survey.name} key={survey.id} />
        ))}
      </select>
    );
  }
}

const Option = ({ label, value, selected }) => {
  return <option value={value}>{label}</option>;
};

const mapStateToProps = ({ table }) => ({
  surveys: table.surveys
});

export default connect(
  mapStateToProps,
  null
)(SelectSurvey);
