import axios, {AxiosError, AxiosResponse} from 'axios'
import {
    Customer,
    CustomerCondensedV2,
    CustomerCondensedV2Paginate,
    CustomerPaginate, CustomerV2
} from '../../models/commerce/Customer.ts';
import {createFormData} from '../../helpers/requests.ts';
import {RecipePaginate} from "../../models/content/Recipe.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/customers`
export const GUEST_EXPORT_ENDPOINT = `${ENDPOINT}/guest/export`;
export const ACTIVE_EXPORT_ENDPOINT = `${ENDPOINT}/active/export`;
export const POTENTIAL_EXPORT_ENDPOINT = `${ENDPOINT}/potential/export`;
export const getAllCustomers = async (): Promise<Customer[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<CustomerPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getCustomers = async (query?: string): Promise<CustomerCondensedV2Paginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getCustomerV2 = async (email: string): Promise<CustomerV2 | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/customer?email=' + email)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const getGuestCustomers = async (query?: string): Promise<RecipePaginate> => {
    let url = `${ENDPOINT}/guest`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getActiveCustomers = async (query?: string): Promise<RecipePaginate> => {
    let url = `${ENDPOINT}/active`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getPotentialCustomers = async (query?: string): Promise<RecipePaginate> => {
    let url = `${ENDPOINT}/potential`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getCustomer = async (id: number): Promise<Customer | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const getGuestCustomer = async (id: number): Promise<Customer | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/guest/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeCustomer = async (customer: Customer): Promise<Customer | AxiosError | undefined> => {
    const formData = createFormData(customer);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateCustomer = async (id: number, customer: Customer): Promise<Customer | AxiosError | undefined> => {
    const formData = createFormData(customer);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
