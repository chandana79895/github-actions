import axios from 'axios';

const baseUrl='https://29bd-14-99-84-194.ngrok-free.app'; // Temporary ngrok URL, to be replaced with actual API URL 

type methodType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export function getApi(endpoint:string, reqBody:any, method:methodType){ //create types for reqBody
    const apiUrl = baseUrl+endpoint;
    
    switch (method) {
        case 'GET':
            return axios.get(apiUrl, { params: reqBody });
        case 'POST':
            return axios.post(apiUrl, reqBody);
        case 'PUT':
            return axios.put(apiUrl, reqBody);
        case 'DELETE':
            return axios.delete(apiUrl, { data: reqBody });
        default:
            throw new Error(`Unsupported method "${method}"`);
    }
}