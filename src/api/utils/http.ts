import axios from "axios";
const baseUrl=process.env.VITE_APP_BASE_URL;
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