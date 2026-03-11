import {Newsletter, NewsletterPaginate} from "../../models/content/Newsletter.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/newsletters`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllNewsletters = async (): Promise<Newsletter[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<NewsletterPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getNewsletters = async (query?: string): Promise<NewsletterPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getNewsletter = async (id: number): Promise<Newsletter | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id + '?include[]=products')
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeNewsletter = async (newsletter: Newsletter): Promise<Newsletter | AxiosError | undefined> => {
    const formData = createFormData(newsletter);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateNewsletter = async (id: number, newsletter: Newsletter): Promise<Newsletter | AxiosError | undefined> => {
    const formData = createFormData(newsletter);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
