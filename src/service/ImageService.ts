import {APIClient} from '../client/IAPIClient';

export const downloadImage = (
  apiClient: APIClient,
  data: IAnalysisRequest,
  token: string,
) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return apiClient
    .post('http://10.0.2.2:8080/api/plant', data, config)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Erro na requisição: ' + error.message);
    });
};
