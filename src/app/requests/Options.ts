import axios, {AxiosError, AxiosResponse} from 'axios'
import {ProductOptionsPaginate} from "../models/commerce/Options.ts";
import {OptionsPaginate} from "../models/Options.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}`

export const getOptions = async (): Promise<
    OptionsPaginate | AxiosError | undefined
> => {
    const url = `${ENDPOINT}/options`

    return axios
        .get(url)
        .then((response: AxiosResponse<OptionsPaginate>) => response.data.data)
        .catch((error) => {
            return error
        })
}

export const getProductOptions = async (): Promise<
    ProductOptionsPaginate | AxiosError | undefined
> => {
    const url = `${ENDPOINT}/commerce/options/product`

    return axios
        .get(url)
        .then((response: AxiosResponse<ProductOptionsPaginate>) => response.data.data)
        .catch((error) => {
            return error
        })
}