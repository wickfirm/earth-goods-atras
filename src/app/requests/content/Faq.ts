import {Faq, FaqPaginate} from "../../models/content/Faq.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/faqs`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllFaqs = async (): Promise<Faq[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=order').then((response: AxiosResponse<FaqPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getFaqs = async (query?: string): Promise<FaqPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getFaq = async (id: number): Promise<Faq | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeFaq = async (faq: Faq): Promise<Faq | AxiosError | undefined> => {
    const formData = createFormData(faq);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateFaq = async (id: number, faq: Faq): Promise<Faq | AxiosError | undefined> => {
    const formData = createFormData(faq);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const reorderFaq = async (faqs: Faq[]): Promise<Faq[] | AxiosError | undefined> => {
    const formData = createFormData(faqs);

    return await axios.post(ENDPOINT + '/reorder', formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
