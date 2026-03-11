import axios, {AxiosError, AxiosResponse} from 'axios'
import {Lifestyle, LifestylePaginate} from '../../models/commerce/Lifestyle.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/lifestyles`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllLifestyles = async (): Promise<Lifestyle[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<LifestylePaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getLifestyles = async (query?: string): Promise<LifestylePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getLifestyle = async (id: number): Promise<Lifestyle | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeLifestyle = async (Lifestyle: Lifestyle): Promise<Lifestyle | AxiosError | undefined> => {
    const formData = createFormData(Lifestyle);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateLifestyle = async (id: number, Lifestyle: Lifestyle): Promise<Lifestyle | AxiosError | undefined> => {
    const formData = createFormData(Lifestyle);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
