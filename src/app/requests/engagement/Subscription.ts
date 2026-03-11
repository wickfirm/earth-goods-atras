import axios, {AxiosError, AxiosResponse} from 'axios'
import {Subscription, SubscriptionPaginate} from '../../models/engagement/Subscription.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/engagement/subscriptions`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllSubscriptions = async (): Promise<Subscription[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<SubscriptionPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getSubscriptions = async (query?: string): Promise<SubscriptionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getSubscription = async (id: number): Promise<Subscription | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeSubscription = async (subscription: Subscription): Promise<Subscription | AxiosError | undefined> => {
    const formData = createFormData(subscription);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateSubscription = async (id: number, subscription: Subscription): Promise<Subscription | AxiosError | undefined> => {
    const formData = createFormData(subscription);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
