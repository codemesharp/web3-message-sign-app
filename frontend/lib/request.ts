import axios, { AxiosRequestConfig } from 'axios';
import { showToast } from './toast';

export async function makeRequest<T>(
  config: AxiosRequestConfig,
  successMessage?: string,
  errorMessage?: string
): Promise<T> {
  try {
    const resp = await axios(config);
    if (successMessage) showToast.success(successMessage);
    return resp.data;
  } catch (err: any) {
    console.error(err);
    const msg = errorMessage || err?.response?.data?.message || err?.message || 'Request failed';
    showToast.error(msg);
    throw err;
  }
}
