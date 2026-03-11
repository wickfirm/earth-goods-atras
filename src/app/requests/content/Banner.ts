import {Banner, BannerPaginate} from "../../models/content/Banner.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/content/banners`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllBanners = async (): Promise<Banner[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all?sort[]=order').then((response: AxiosResponse<BannerPaginate>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getBanners = async (query?: string): Promise<BannerPaginate> => {
    let url = `${ENDPOINT}`;

    if (query) {
        url += `?${query}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const getBanner = async (id: number): Promise<Banner | AxiosError | undefined> => {
    return await axios.get(ENDPOINT + '/' + id)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}

export const storeBanner = async (banner: Banner): Promise<Banner | AxiosError | undefined> => {
    const formData = createFormData(banner);

    return await axios.post(ENDPOINT, formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}

export const updateBanner = async (id: number, banner: Banner): Promise<Banner | AxiosError | undefined> => {
    const formData = createFormData(banner);

    formData.append('_method', 'put');

    return await axios.post(ENDPOINT + '/' + id, formData).then(res => res.data.data).catch((error) => {
        return error;
    });
}
