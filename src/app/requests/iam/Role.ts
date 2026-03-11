import axios, {AxiosError, AxiosResponse} from 'axios'

import {Role, RolePaginate} from '../../models/iam/Role';
import {createFormData} from '../../helpers/requests';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/iam/roles`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllRoles = async (): Promise<Role[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<RolePaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getRoles = async (query?: string): Promise<RolePaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getRole = async (id: number): Promise<Role | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeRole = async (role: Role): Promise<Role | AxiosError | undefined> => {
    const formData = createFormData(role);

    return await axios.post(ENDPOINT, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}

export const updateRole = async (id: number, role: Role): Promise<Role | AxiosError | undefined> => {
    const formData = createFormData(role);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}