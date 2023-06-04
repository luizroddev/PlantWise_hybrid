export interface APIClient {
  post(url: string, data: any, config: any): Promise<any>;
}
