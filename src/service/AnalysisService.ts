import {IAnalysisResponse} from '../@types/IAnalysisResponse';
import {AxiosAPIClient} from '../client/AxiosAPIClient';
import {APIClient} from '../client/IAPIClient';
import {downloadImage} from './ImageService';

export const analyzeImage = async (
  apiClient: APIClient,
  analysisRequest: IAnalysisRequest,
  token: string,
) => {
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return apiClient
    .post(
      'http://10.0.2.2:8080/api/analises/usuario/' + analysisRequest.userId,
      analysisRequest,
      config,
    )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('Erro na requisição: ' + error.message);
    });
};
