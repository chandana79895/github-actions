import { getApi } from './http';
import axios from 'axios';

jest.mock('axios');

describe('getApi', () => {
  it('throws an error when an unsupported method is passed', () => {
    expect(() => getApi('/test', {}, 'UNSUPPORTED' as never)).toThrow(`Unsupported method "UNSUPPORTED"`);
  });

  it('calls axios.get with correct parameters when method is GET', async () => {
    const data = { param: 'test' };
    await getApi('/test', data, 'GET');
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/test'), { headers: data });
  });


  it('calls axios.post with correct parameters when method is POST', async () => {
    const data = { param: 'test' };
    await getApi('/test', data, 'POST');
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/test'), data, undefined);
  });

  it('calls axios.post with correct parameters when method is POST_HEADER', async () => {
    const data = { param: 'test' };
    const customHeaders = { 'Content-Type': 'application/json' };
    await getApi('/test', data, 'POST_HEADER', customHeaders);
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/test'), data, { headers: customHeaders });
  });

  it('calls axios.put with correct parameters when method is PUT', async () => {
    const data = { param: 'test' };
    await getApi('/test', data, 'PUT');
    expect(axios.put).toHaveBeenCalledWith(expect.stringContaining('/test'), data);
  });

  it('calls axios.delete with correct parameters when method is DELETE', async () => {
    const data = { param: 'test' };
    await getApi('/test', data, 'DELETE');
    expect(axios.delete).toHaveBeenCalledWith(expect.stringContaining('/test'), { data: data });
  });

  it('calls axios.get with correct parameters when method is GET_PARAMS', async () => {
    const data = { param: 'test' };
    const customHeaders = { 'Content-Type': 'application/json' };
    await getApi('/test', data, 'GET_PARAMS', customHeaders);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/test'), { params: data, headers: customHeaders });
  });
});
