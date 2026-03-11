import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests.ts';
import {ContactSubmission, ContactSubmissionPaginate} from "../../models/contact/ContactSubmission.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/engagement/contact-submissions`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllContactSubmissions = async (): Promise<ContactSubmission[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<ContactSubmissionPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getContactSubmissions = async (query?: string): Promise<ContactSubmissionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getContactSubmission = async (id: number): Promise<ContactSubmission | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeContactSubmission = async (submission: ContactSubmission): Promise<ContactSubmission | AxiosError | undefined> => {
    const formData = createFormData(submission);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateContactSubmission = async (id: number, submission: ContactSubmission): Promise<ContactSubmission | AxiosError | undefined> => {
    const formData = createFormData(submission);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
