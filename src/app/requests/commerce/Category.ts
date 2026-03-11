import axios, {AxiosError, AxiosResponse} from 'axios'
import {Category, CategoryPaginate} from '../../models/commerce/Category.ts';
import {createFormData} from '../../helpers/requests.ts';
import {Faq} from "../../models/content/Faq.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/categories`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllCategories = async (): Promise<Category[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=order').then((response: AxiosResponse<CategoryPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getCategories = async (query?: string): Promise<CategoryPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getCategory = async (id: number): Promise<Category | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCategory = async (category: Category): Promise<Category | AxiosError | undefined> => {
    const formData = createFormData(category);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateCategory = async (id: number, category: Category): Promise<Category | AxiosError | undefined> => {
    const formData = createFormData(category);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const reorderCategory = async (categories: Category[]): Promise<Category[] | AxiosError | undefined> => {
    const formData = createFormData(categories);

    return await axios.post(ENDPOINT + '/reorder', formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
