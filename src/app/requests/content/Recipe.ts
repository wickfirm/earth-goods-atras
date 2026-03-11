import {Recipe, RecipePaginate} from "../../models/content/Recipe.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/recipes`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllRecipes = async (): Promise<Recipe[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<RecipePaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getRecipes = async (query?: string): Promise<RecipePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getRecipe = async (id: number): Promise<Recipe | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id + '?include[]=products')
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeRecipe = async (recipe: Recipe): Promise<Recipe | AxiosError | undefined> => {
    const formData = createFormData(recipe);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateRecipe = async (id: number, recipe: Recipe): Promise<Recipe | AxiosError | undefined> => {
    const formData = createFormData(recipe);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
