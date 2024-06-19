import axios from "axios";
import { baseUrl_const } from "../const/env";
const baseUrl = baseUrl_const;
// const baseUrl = "https://3663-2401-4900-1cb9-9e61-59a-aa50-4bad-89c3.ngrok-free.app/";
// const baseUrl = "https://f3fc-14-99-84-194.ngrok-free.app/";
// const baseUrl = process.env.VITE_APP_BASE_URL;

type methodType =
  | "GET"
  | "GET_PARAMS"
  | "POST"
  | "PUT"
  | "DELETE"
  | "POST_HEADER";

export const headers = {
  authorization:
    "Basic emFwY29tX3Rlc3Q6YmY2MDkwMmRiYjQxZjhjYTFhNGM4ZmQzMDQ1MmU2Yjg=",
  "ngrok-skip-browser-warning": true,
};
export function getApi(
  endpoint: string,
  reqBody: object,
  method: methodType,
  headers?: object
) {
  //create types for reqBody
  const apiUrl = baseUrl + endpoint;

  switch (method) {
    case "GET":
      return axios.get(apiUrl, { headers: reqBody });
    case "GET_PARAMS":
      return axios.get(apiUrl, { params: reqBody, headers });
    case "POST":
      return axios.post(apiUrl, reqBody, headers);
    case "POST_HEADER":
      return axios.post(apiUrl, reqBody, { headers: headers });
    case "PUT":
      return axios.put(apiUrl, reqBody);
    case "DELETE":
      return axios.delete(apiUrl, { data: reqBody });
    default:
      throw new Error(`Unsupported method "${method}"`);
  }
}
