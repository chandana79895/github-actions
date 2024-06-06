import axios from "axios";
import { baseUrl_const } from "../const/env";

const baseUrl = baseUrl_const
// const baseUrl = process.env.VITE_APP_BASE_URL;
// const baseUrl = "https://0abf-14-99-84-194.ngrok-free.app/";

type methodType = "GET" | "POST" | "PUT" | "DELETE";

export function getApi(endpoint: string, reqBody: object, method: methodType) {
  //create types for reqBody
  const apiUrl = baseUrl + endpoint;

  switch (method) {
    case "GET":
      return axios.get(apiUrl, { headers: reqBody });
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