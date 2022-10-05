import axios from "axios";

const API_URL = "http://locahost:3000/api/Ordenes/GetR_OrdenesAsync";

const detalleOrdenes = (options) => {
  if (options.fileType == "PDF") {
    return axios
    .post(API_URL, options, { responseType: 'blob'})
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      console.log("error get pdf");
      console.log(error.response.data);
    });    
  } else {
    return axios
    .post(API_URL, options, { responseType: 'arraybuffer'})
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch(error => {
      console.log("error get xls");
      console.log(error.response.data);
    });
  }

};

const ReportService = {
  detalleOrdenes
}

export default ReportService;
