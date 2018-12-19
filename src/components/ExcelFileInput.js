import React from "react";
import { connect } from "react-redux";
import XLSX from "xlsx";
import { setTable } from "../reducers";

class ExcelFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }
  handleFile(file) {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = ({ target: { result } }) => {
      const wb = XLSX.read(result, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.props.setTable(data);
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }
  render() {
    return <DataInput handleFile={this.handleFile} />;
  }
}

const mapDispatchToProps = {
  setTable
};

export default connect(
  null,
  mapDispatchToProps
)(ExcelFileInput);

class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <>
        <button onClick={() => this.fileInput.current.click()}>
          Import File
        </button>
        <input
          ref={this.fileInput}
          type="file"
          hidden
          accept={SheetJSFT}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");
