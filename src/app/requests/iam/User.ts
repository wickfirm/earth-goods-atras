import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from '../../helpers/requests'
import {User, UserPaginate} from '../../models/iam/User'
import {FormFields} from "../../pages/iam/users/core/changePasswordForm.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/iam/users`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`

export const getAllUsers = async (query?: string): Promise<User[] | AxiosError | undefined> => {
    return axios
        .get(ENDPOINT + '/all?sort[]=name' + (query ? '&' + query : ''))
        .then((response: AxiosResponse<UserPaginate>) => response.data.data)
        .catch((error) => {
            return error
        })
}

export const getUsers = async (query?: string): Promise<UserPaginate> => {
    let url = `${ENDPOINT}`

    if (query) {
        url += `?${query}`
    }

    const response = await axios.get(url);
    return response.data;
}

export const getUser = async (id: number): Promise<User | AxiosError | undefined> => {
    return await axios
        .get(ENDPOINT + '/' + id)
        .then((res) => res.data.data)
        .catch((error) => {
            return error
        })
}

export const updateUser = async (id: number, user: User): Promise<User | AxiosError | undefined> => {
    const formData = createFormData(user)

    formData.append('_method', 'put')

    return await axios
        .post(ENDPOINT + '/' + id, formData)
        .then((res) => res.data.data)
        .catch((error) => {
            return error
        })
}

export const storeUser = async (user: User): Promise<User | AxiosError | undefined> => {
    const formData = createFormData(user)

    return await axios
        .post(ENDPOINT, formData)
        .then((res) => res.data.data)
        .catch((error) => {
            return error
        })
}

export const changePassword = async (
    user: User,
    form: FormFields
): Promise<User | AxiosError | undefined> => {
    const formData = createFormData(form)

    formData.append('_method', 'put')

    return await axios
        .post(ENDPOINT + '/' + user.id + '/password', formData)
        .then((res) => res.data)
        .catch((error) => {
            return error
        })
}


export const getProfile = async (): Promise<User | AxiosError | undefined> => {
    return await axios
        .get(`${API_URL}/profile`)
        .then((res) => res.data.data)
        .catch((error) => {
            return error
        })
}