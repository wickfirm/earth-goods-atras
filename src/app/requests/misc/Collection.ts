import axios, {AxiosError, AxiosResponse} from 'axios'
import {Collection, CollectionPaginate} from '../../models/misc/Collection';
import {createFormData} from '../../helpers/requests';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/misc/collections`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllCollections = async (): Promise<Collection[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<CollectionPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getCollections = async (query?: string): Promise<CollectionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getCollection = async (id: number): Promise<Collection | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCollection = async (collection: Collection): Promise<Collection | AxiosError | undefined> => {
    const formData = createFormData(collection);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateCollection = async (id: number, collection: Collection): Promise<Collection | AxiosError | undefined> => {
    const formData = createFormData(collection);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
