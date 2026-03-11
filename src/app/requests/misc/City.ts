import axios, {AxiosError, AxiosResponse} from 'axios'
import {City, CityPaginate} from '../../models/misc/City';
import {createFormData} from '../../helpers/requests';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/misc/cities`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllCities = async (): Promise<City[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<CityPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getCities = async (query?: string): Promise<CityPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getCity = async (id: number): Promise<City | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCity = async (city: City): Promise<City | AxiosError | undefined> => {
    const formData = createFormData(city);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateCity = async (id: number, city: City): Promise<City | AxiosError | undefined> => {
    const formData = createFormData(city);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
