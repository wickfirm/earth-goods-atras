import {Blog, BlogPaginate} from "../../models/content/Blog.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/blogs`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllBlogs = async (): Promise<Blog[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=name').then((response: AxiosResponse<BlogPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getBlogs = async (query?: string): Promise<BlogPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getBlog = async (id: number): Promise<Blog | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeBlog = async (blog: Blog): Promise<Blog | AxiosError | undefined> => {
    const formData = createFormData(blog);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateBlog = async (id: number, blog: Blog): Promise<Blog | AxiosError | undefined> => {
    const formData = createFormData(blog);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
