import axios, {AxiosError, AxiosResponse} from 'axios'
import {
    Product,
    ProductPaginate,
    ProductUploadedFile,
    ProductUploadedFilePaginate
} from '../../models/commerce/Product.ts';
import {createFormData} from '../../helpers/requests.ts';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/products`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;
export const EXPORT_GENERAL_ENDPOINT = `${ENDPOINT}/general/export`;

export const getAllProducts = async (): Promise<Product[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<ProductPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getProducts = async (query?: string): Promise<ProductPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getProduct = async (id: number): Promise<Product | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id + '?include[]=gallery&include[]=nutrition&include[]=claims&include[]=omittedIngredients&include[]=pairedProducts')
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeProduct = async (product: Product): Promise<Product | AxiosError | undefined> => {
    const formData = createFormData(product);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateProduct = async (id: number, product: Product): Promise<Product | AxiosError | undefined> => {
    const formData = createFormData(product);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const storeBulkProducts = async (products: Product): Promise<Product | AxiosError | undefined> => {
    const formData = createFormData(products);

    return await axios.post(ENDPOINT + '/bulk', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const getProductUploadedFiles = async (): Promise<ProductUploadedFile[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/bulk').then((response: AxiosResponse<ProductUploadedFilePaginate>) => response.data.data).catch((error) => {
        return error;
    });
}