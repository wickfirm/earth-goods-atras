import axios, {AxiosError, AxiosResponse} from 'axios'
import {Ingredient, IngredientPaginate} from '../../models/commerce/Ingredient.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/ingredients`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllIngredients = async (): Promise<Ingredient[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<IngredientPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getIngredients = async (query?: string): Promise<IngredientPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getIngredient = async (id: number): Promise<Ingredient | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeIngredient = async (ingredient: Ingredient): Promise<Ingredient | AxiosError | undefined> => {
    const formData = createFormData(ingredient);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateIngredient = async (id: number, ingredient: Ingredient): Promise<Ingredient | AxiosError | undefined> => {
    const formData = createFormData(ingredient);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
