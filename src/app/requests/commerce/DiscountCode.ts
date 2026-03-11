import axios, {AxiosError, AxiosResponse} from 'axios'
import {DiscountCode, DiscountCodePaginate} from '../../models/commerce/DiscountCode.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/discount-codes`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllDiscountCodes = async (): Promise<DiscountCode[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=code').then((response: AxiosResponse<DiscountCodePaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getDiscountCodes = async (query?: string): Promise<DiscountCodePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getDiscountCode = async (id: number): Promise<DiscountCode | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeDiscountCode = async (discountCode: DiscountCode): Promise<DiscountCode | AxiosError | undefined> => {
    const formData = createFormData(discountCode);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateDiscountCode = async (id: number, discountCode: DiscountCode): Promise<DiscountCode | AxiosError | undefined> => {
    const formData = createFormData(discountCode);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
