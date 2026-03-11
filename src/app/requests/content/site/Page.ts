import axios, {AxiosError, AxiosResponse} from 'axios'
import {Page, PagePaginate} from '../../../models/content/Site';
import {createFormData} from "../../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/site/pages`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllPages = async (): Promise<Page[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PagePaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getPages = async (query?: string): Promise<PagePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getPage = async (id: number): Promise<Page | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePage = async (page: Page): Promise<Page | AxiosError | undefined> => {
    const formData = createFormData(page);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updatePage = async (id: number, page: Page): Promise<Page | AxiosError | undefined> => {
    const formData = createFormData(page);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
