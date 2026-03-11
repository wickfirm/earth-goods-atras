import axios, {AxiosError, AxiosResponse} from 'axios'
import {createFormData} from "../../../helpers/requests.ts";
import {Section, SectionPaginate} from "../../../models/content/Site.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const BASE_ENDPOINT = `${API_URL}/content/site/pages`
const ENDPOINT = 'sections'

export const getAllSections = async (): Promise<Section[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<SectionPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}
export const getSections = async (pageId: number, query?: string): Promise<SectionPaginate> => {
    let url = `${BASE_ENDPOINT}/${pageId}/${ENDPOINT}`

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getSection = async (pageId: number, sectionId: number, query?: string): Promise<SectionPaginate> => {
    let url = `${BASE_ENDPOINT}/${pageId}/${ENDPOINT}/${sectionId}`

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const updateSection = async (pageId: number, sectionId: number, section: Section): Promise<Section | AxiosError | undefined> => {
    const url = `${BASE_ENDPOINT}/${pageId}/${ENDPOINT}/${sectionId}`

    const formData = createFormData(section)

    formData.append('_method', 'put')

    return await axios
        .post(url, formData)
        .then((response) => response.data.data)
        .catch((error) => {
            return error
        });
}