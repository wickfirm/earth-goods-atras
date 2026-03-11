import axios, {AxiosError, AxiosResponse} from 'axios'
import {PaymentMethod, PaymentMethodPaginate} from '../../models/misc/PaymentMethod';
import {createFormData} from '../../helpers/requests';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/misc/payment-methods`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllPaymentMethods = async (): Promise<PaymentMethod[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PaymentMethodPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getPaymentMethods = async (query?: string): Promise<PaymentMethodPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getPaymentMethod = async (id: number): Promise<PaymentMethod | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePaymentMethod = async (paymentMethod: PaymentMethod): Promise<PaymentMethod | AxiosError | undefined> => {
    const formData = createFormData(paymentMethod);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updatePaymentMethod = async (id: number, paymentMethod: PaymentMethod): Promise<PaymentMethod | AxiosError | undefined> => {
    const formData = createFormData(paymentMethod);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
