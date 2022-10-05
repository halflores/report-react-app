import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import DatePicker from 'react-datepicker';
import report from "../services/report.service";
import fileSaver from 'file-saver';
import 'react-datepicker/dist/react-datepicker.css';
import { dropdownIndicatorCSS } from "react-select/dist/declarations/src/components/indicators";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        El campo es requerido!
      </div>
    );
  }
};

const BoardReport = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date()); 
  const [reportName, setReportName] = useState(null);
  const [fileType, setFileType] = useState("PDF");

  const tab = '\u00A0';

  const onChangeReportName = (e) => {
    setReportName(e.target.value);
  }

  const onChangeFileType = (e) => {
    setFileType(e.target.value);
  }

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
        console.log("enviar");
        console.log("enviar: " + fileType);
        if (startDate === null) {
          setMessage("Por favor, ingrese una fecha inicial...");
          setLoading(false);          
          return;
        } if(endDate === null) {
          setMessage("Por favor, ingrese una fecha final...");
          setLoading(false);          
          return;
        } 

        const options = {
          "fileType": fileType,
          "Id": 0,
          "CustomerId ": 0,          
          "fechaRegistroInicial": startDate,
          "fechaRegistroFinal": endDate 
        };

        if (reportName === "detOrdenes") {
          report.detalleOrdenes(options)
          .then((response) => {
            if (fileType === "PDF") {
              //setMessage(response.data);
              const file = new Blob([response.data], { type: "application/pdf" });
              //Build a URL from the file
              const fileURL = URL.createObjectURL(file);
              //Open the URL on new Window
              const pdfWindow = window.open();
              pdfWindow.location.href = fileURL;
            } else {dropdownIndicatorCSS
              var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              fileSaver.saveAs(blob, 'detOrdenes.xls');
            }
            setLoading(false);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setMessage(resMessage);
            setLoading(false);
          });          
        } else {
          setMessage("Por favor, elija un reporte ...");
          setLoading(false);
        }
    }
  };

  return (
    <div className="col-md-6">
      <div className="card card-container">
          <h3>
            <strong>Generador de reportes</strong>
          </h3>

          <Form onSubmit={handleRegister} ref={form}>
            {
              <div>
                <div className="form-group">
                  <fieldset>
                      <label htmlFor="detOrdenes">
                          <input type="radio" value="detOrdenes" id="detOrdenes"
                              onChange={onChangeReportName} name="reportName" />
                          {tab}Detalle de ordenes
                      </label>
                      <br></br>
                      {/* <p>Reporte elegido: {reportName}</p> */}
                  </fieldset>
                </div>
                <br></br>
                <div className="form-group">
                  <label>Elegir fecha inicial: </label>
                  <DatePicker
                      className="form-control"
                      closeOnScroll={true}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      name="startDate"
                      dateFormat="dd/MM/yyyy"
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <label>Elegir fecha final: </label>
                  <DatePicker
                      className="form-control"
                      closeOnScroll={true}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      name="endDate"
                      dateFormat="dd/MM/yyyy"
                  />
                </div>
                <br></br>
                <div className="form-group">
                  <fieldset>
                      <label htmlFor="pdf">
                          <input type="radio" value="PDF" id="PDF" defaultChecked={fileType}
                              onChange={onChangeFileType} name="fileType" />
                          {tab}Exportar a PDF
                      </label>
                      <br></br>
                      <label htmlFor="xls"> 
                          <input type="radio" value="XLS" id="XLS"
                              onChange={onChangeFileType} name="fileType"/>
                          {tab}Exportar a XLS
                      </label>
                      {/* <p>Reporte elegido: {reportName}</p> */}
                  </fieldset>
                </div>

                <div className="form-group">
                  <br></br>
                  <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>&nbsp;Generar reporte</span>
                  </button>
                </div>
              </div>
            }

            {message && (
              <div className="form-group">
                <br></br>
                <div
                  className= "alert alert-danger"
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
      </div>
    </div>    
  );
};

export default BoardReport;
