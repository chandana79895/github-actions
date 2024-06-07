import { getApi } from './http';
import axios from 'axios';

jest.mock('axios');
describe('getApi', () => {
  it('throws an error when an unsupported method is passed', () => {
    expect(() => getApi('/test', {}, 'UNSUPPORTED' as any)).toThrow(`Unsupported method "UNSUPPORTED"`);
  });

  it('calls axios.get with correct parameters when method is GET', async () => {
    const data = { param: 'test' };
    await getApi('/test', data, 'GET');
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/test'), { headers: data });
  });

  it('calls axios.post with correct parameters when method is POST', async () => {
    const data = { param: 'test' };
    await getApi('/test', data, 'POST');
    expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('/test'), data);
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
});