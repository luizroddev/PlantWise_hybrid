import { IUser } from '../@types/IUser';
import { APIClient } from '../client/IAPIClient';

export const login = async (
    apiClient: APIClient,
    email: string,
    senha: string,
) => {
    return apiClient
        .post('api/usuarios/login', { email, senha }, {})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error('Erro na requisição: ' + error.message);
        });
};

export const register = async (apiClient: APIClient, user: IUser) => {
    return apiClient
        .post('api/usuarios/registrar', user, {})
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error('Erro na requisição: ' + error.message);
        });
};
