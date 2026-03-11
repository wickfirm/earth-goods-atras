import axios, {AxiosError} from 'axios'
import {Order} from '../../models/commerce/Order.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/iq-fulfillment`


export const getIQOrder = async (clientRef: string): Promise<Order | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/orders/' + clientRef)
        .then(res => res.data).catch((error) => {
            return error;
        });
}
