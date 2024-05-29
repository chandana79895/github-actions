import axios from "axios";
import config from "../const/sessionTimeOut"; 
// const baseUrl = "https://apac.api.capillarytech.com/v1.1";
const baseUrl=config.ApiUrl.VITE_APP_BASE_URL; // Temporary ngrok URL, to be replaced with actual API URL
console.log(`ApiBaseUrl: ${baseUrl}`);
type methodType = "GET" | "POST" | "PUT" | "DELETE";

export function getApi(endpoint: string, reqBody: any, method: methodType) {
  //create types for reqBody
  const apiUrl = baseUrl + endpoint;

  switch (method) {
    case "GET":
      return axios.get(apiUrl, { params: reqBody });
    case "POST":
      return axios.post(apiUrl, reqBody);
    case "PUT":
      return axios.put(apiUrl, reqBody);
    case "DELETE":
      return axios.delete(apiUrl, { data: reqBody });
    default:
      throw new Error(`Unsupported method "${method}"`);
  }
}