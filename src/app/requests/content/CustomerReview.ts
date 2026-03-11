import {CustomerReview, CustomerReviewPaginate} from "../../models/content/CustomerReview.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/customer-reviews`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllCustomerReviews = async (): Promise<CustomerReview[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<CustomerReviewPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getCustomerReviews = async (query?: string): Promise<CustomerReviewPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getCustomerReview = async (id: number): Promise<CustomerReview | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCustomerReview = async (customerReview: CustomerReview): Promise<CustomerReview | AxiosError | undefined> => {
    const formData = createFormData(customerReview);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateCustomerReview = async (id: number, customerReview: CustomerReview): Promise<CustomerReview | AxiosError | undefined> => {
    const formData = createFormData(customerReview);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
