import {Policy, PolicyPaginate} from "../../models/content/Policy.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/policies`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllPolicies = async (): Promise<Policy[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<PolicyPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getPolicies = async (query?: string): Promise<PolicyPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getPolicy = async (id: number): Promise<Policy | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const getPolicyByType = async (type: string): Promise<Policy | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + type)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storePolicy = async (policy: Policy): Promise<Policy | AxiosError | undefined> => {
    const formData = createFormData(policy);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updatePolicy = async (id: number, policy: Policy): Promise<Policy | AxiosError | undefined> => {
    const formData = createFormData(policy);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
