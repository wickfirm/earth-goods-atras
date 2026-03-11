import axios, {AxiosError} from 'axios'
import {createFormData} from "../../../helpers/requests.ts";
import {SectionData, SectionDataPaginate} from "../../../models/content/Site.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const BASE_ENDPOINT = `${API_URL}/content/site/pages`
const SECTIONS_ENDPOINT = 'sections'
const SECTION_DATA_ENDPOINT = 'data'

export const getSectionData = async (pageId: number, sectionId: number, query?: string): Promise<SectionDataPaginate> => {
    let url = `${BASE_ENDPOINT}/${pageId}/${SECTIONS_ENDPOINT}/${sectionId}/${SECTION_DATA_ENDPOINT}`

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getSectionDatum = async (pageId: number, sectionId: number, id: number, query?: string): Promise<SectionDataPaginate> => {
    let url = `${BASE_ENDPOINT}/${pageId}/${SECTIONS_ENDPOINT}/${sectionId}/${SECTION_DATA_ENDPOINT}/${id}`

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const storeSectionDatum = async (pageId: number, sectionId: number, sectionData: SectionData): Promise<SectionData | AxiosError | undefined> => {
    const url = `${BASE_ENDPOINT}/${pageId}/${SECTIONS_ENDPOINT}/${sectionId}/${SECTION_DATA_ENDPOINT}`

    const formData = createFormData(sectionData);

    return await axios.post(url, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateSectionDatum = async (pageId: number, sectionId: number, id: number, sectionData: SectionData): Promise<SectionData | AxiosError | undefined> => {
    const url = `${BASE_ENDPOINT}/${pageId}/${SECTIONS_ENDPOINT}/${sectionId}/${SECTION_DATA_ENDPOINT}/${id}`

    const formData = createFormData(sectionData)

    formData.append('_method', 'put')

    return await axios
        .post(url, formData)
        .then((response) => response.data.data)
        .catch((error) => {
            return error
        });
}