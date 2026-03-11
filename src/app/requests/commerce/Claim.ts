import axios, {AxiosError, AxiosResponse} from 'axios'
import {Claim, ClaimPaginate} from '../../models/commerce/Claim.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/claims`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllClaims = async (): Promise<Claim[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<ClaimPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getClaims = async (query?: string): Promise<ClaimPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getClaim = async (id: number): Promise<Claim | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeClaim = async (claim: Claim): Promise<Claim | AxiosError | undefined> => {
    const formData = createFormData(claim);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateClaim = async (id: number, claim: Claim): Promise<Claim | AxiosError | undefined> => {
    const formData = createFormData(claim);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
