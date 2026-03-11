import axios, {AxiosError, AxiosResponse} from 'axios'
import {Tag, TagPaginate} from '../../models/commerce/Tag.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/tags`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllTags = async (): Promise<Tag[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<TagPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getTags = async (query?: string): Promise<TagPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getTag = async (id: number): Promise<Tag | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeTag = async (tag: Tag): Promise<Tag | AxiosError | undefined> => {
    const formData = createFormData(tag);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateTag = async (id: number, tag: Tag): Promise<Tag | AxiosError | undefined> => {
    const formData = createFormData(tag);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
