import axios, {AxiosInstance} from 'axios';
import {APIClient} from './IAPIClient';

// Implementação do APIClient utilizando o axios
export class AxiosAPIClient implements APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  public post(url: string, data: any, config: any): Promise<any> {
    return this.client.post(url, data, config);
  }
}
