import axios, {AxiosError, AxiosResponse} from 'axios'
import {Subject, SubjectPaginate} from '../../models/misc/Subject';
import {createFormData} from '../../helpers/requests';

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/misc/subjects`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllSubjects = async (): Promise<Subject[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<SubjectPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getSubjects = async (query?: string): Promise<SubjectPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getSubject = async (id: number): Promise<Subject | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeSubject = async (subject: Subject): Promise<Subject | AxiosError | undefined> => {
    const formData = createFormData(subject);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateSubject = async (id: number, subject: Subject): Promise<Subject | AxiosError | undefined> => {
    const formData = createFormData(subject);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
