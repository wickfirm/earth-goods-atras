import axios, {AxiosError, AxiosResponse} from 'axios'
import {SubscriptionPaginate} from '../../models/engagement/Subscription.ts';
import {createFormData} from '../../helpers/requests.ts';
import {
    GetCodeSubmission,
    GetCodeSubmissionPaginate
} from "../../models/engagement/GetCodeSubmission.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/engagement/get-code-submissions`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllGetCodeSubmissions = async (): Promise<GetCodeSubmission[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<SubscriptionPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getGetCodeSubmissions = async (query?: string): Promise<GetCodeSubmissionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getGetCodeSubmission = async (id: number): Promise<GetCodeSubmission | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeGetCodeSubmission = async (submission: GetCodeSubmission): Promise<GetCodeSubmission | AxiosError | undefined> => {
    const formData = createFormData(submission);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateGetCodeSubmission = async (id: number, submission: GetCodeSubmission): Promise<GetCodeSubmission | AxiosError | undefined> => {
    const formData = createFormData(submission);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
