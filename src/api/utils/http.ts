import axios from 'axios';

const baseUrl='https://apac.api.capillarytech.com/v1.1';


export function getApi(endpoint:string,accessToken?){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      };
    const apiUrl = baseUrl+endpoint
    return axios.get(apiUrl,{headers})
}