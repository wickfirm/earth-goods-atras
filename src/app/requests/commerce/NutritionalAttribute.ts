import axios, {AxiosError, AxiosResponse} from 'axios'
import {NutritionalAttribute, NutritionalAttributePaginate} from '../../models/commerce/NutritionalAttribute.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/nutritional-attributes`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllNutritionalAttributes = async (): Promise<NutritionalAttribute[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<NutritionalAttributePaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getNutritionalAttributes = async (query?: string): Promise<NutritionalAttributePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getNutritionalAttribute = async (id: number): Promise<NutritionalAttribute | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeNutritionalAttribute = async (nutritionalAttribute: NutritionalAttribute): Promise<NutritionalAttribute | AxiosError | undefined> => {
    const formData = createFormData(nutritionalAttribute);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateNutritionalAttribute = async (id: number, nutritionalAttribute: NutritionalAttribute): Promise<NutritionalAttribute | AxiosError | undefined> => {
    const formData = createFormData(nutritionalAttribute);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
