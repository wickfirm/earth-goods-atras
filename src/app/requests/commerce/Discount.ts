import axios, {AxiosError} from 'axios'
import {createFormData} from '../../helpers/requests.ts';
import {ReturnResponse} from "../../models/Response.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/commerce/discount`
export const applyBulkDiscount = async (discount: any): Promise<ReturnResponse | AxiosError | undefined> => {
    const formData = createFormData(discount);

    return await axios.post(ENDPOINT + '/bulk', formData)
        .then(res => res.data.data)
        .catch((error) => {
            return error;
        });
}
