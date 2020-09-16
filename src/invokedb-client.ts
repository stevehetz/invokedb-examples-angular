import { InvokeDBClient } from 'invokedb';
import { BASE_URL, API_KEY } from 'src/invoke-config.json';

export const invokedbClient = new InvokeDBClient({
  apiKey: API_KEY,
  baseUrl: BASE_URL
});
