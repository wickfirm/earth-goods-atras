import axios, {AxiosError, AxiosResponse} from 'axios'
import {Order, OrderPaginate} from '../../models/commerce/Order.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/orders`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllOrders = async (): Promise<Order[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<OrderPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getOrders = async (query?: string): Promise<OrderPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);

    return response.data;
}

export const getOrder = async (id: number): Promise<Order | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const getOrderIQDetails = async (id: number): Promise<Order | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id + '/iq-details')
        .then(res => res.data).catch((error) => {
            return error;
        });
}

export const storeOrder = async (order: Order): Promise<Order | AxiosError | undefined> => {
    const formData = createFormData(order);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateOrder = async (id: number, order: Order): Promise<Order | AxiosError | undefined> => {
    const formData = createFormData(order);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}


export const refundOrder = async (id: number): Promise<Order | AxiosError | undefined> => {
    return await axios.post(ENDPOINT + '/' + id + '/refund')
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const exportComprehensiveReport = async (id: number): Promise<any | AxiosError | undefined> => {

    // return  await fetch(`${ENDPOINT}/${id}/export/comprehensive`);
    // return await axios.get(ENDPOINT + '/' + id + '/export/comprehensive');
    //     .then(res => res.data).catch((error) => {
    //         return error;
    //     });

    return axios.get(ENDPOINT + '/' + id + '/export/comprehensive', {
        responseType: 'blob', // 👈 this is the key
    });
}