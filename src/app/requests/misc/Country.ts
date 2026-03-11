import axios, {AxiosError, AxiosResponse} from 'axios'
import {Country, CountryPaginate} from '../../models/misc/Country';
import {createFormData} from '../../helpers/requests';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/misc/countries`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllCountries = async (): Promise<Country[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<CountryPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getCountries = async (query?: string): Promise<CountryPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getCountry = async (id: number): Promise<Country | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCountry = async (country: Country): Promise<Country | AxiosError | undefined> => {
    const formData = createFormData(country);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateCountry = async (id: number, country: Country): Promise<Country | AxiosError | undefined> => {
    const formData = createFormData(country);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
