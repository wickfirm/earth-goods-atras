import axios, {AxiosError, AxiosResponse} from 'axios'
import {Permission, PermissionPaginate} from '../../models/iam/Permission';
import {createFormData} from '../../helpers/requests';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/iam/permissions`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllPermissions = async (): Promise<Permission[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PermissionPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getPermissions = async (query?: string): Promise<PermissionPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getPermission = async (id: number): Promise<Permission | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePermission = async (permission: Permission): Promise<Permission | AxiosError | undefined> => {
    const formData = createFormData(permission);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updatePermission = async (id: number, permission: Permission): Promise<Permission | AxiosError | undefined> => {
    const formData = createFormData(permission);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
