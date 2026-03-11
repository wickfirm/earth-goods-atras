import axios, {AxiosError, AxiosResponse} from 'axios'
import {Review, ReviewPaginate} from '../../models/engagement/Review.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/engagement/reviews`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllReviews = async (): Promise<Review[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<ReviewPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getReviews = async (query?: string): Promise<ReviewPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getReview = async (id: number): Promise<Review | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeReview = async (review: Review): Promise<Review | AxiosError | undefined> => {
    const formData = createFormData(review);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateReview = async (id: number, review: Review): Promise<Review | AxiosError | undefined> => {
    const formData = createFormData(review);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
