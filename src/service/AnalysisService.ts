import { IAnalysisRequest } from '../@types/IAnalysisRequest';
import { APIClient } from '../client/IAPIClient';

export const analyzeImage = async (
    apiClient: APIClient,
    analysisRequest: IAnalysisRequest,
    token: string,
) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return apiClient
        .post(
            'api/analises/usuario/' + analysisRequest.userId,
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
