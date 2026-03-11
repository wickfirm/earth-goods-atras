import axios, {AxiosError, AxiosResponse} from 'axios'
import {Highlight, HighlightPaginate} from '../../models/commerce/Highlight.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/highlights`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllHighlights = async (): Promise<Highlight[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<HighlightPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getHighlights = async (query?: string): Promise<HighlightPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getHighlight = async (id: number): Promise<Highlight | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeHighlight = async (highlight: Highlight): Promise<Highlight | AxiosError | undefined> => {
    const formData = createFormData(highlight);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateHighlight = async (id: number, highlight: Highlight): Promise<Highlight | AxiosError | undefined> => {
    const formData = createFormData(highlight);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
