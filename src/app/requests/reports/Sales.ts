import axios, {AxiosError} from 'axios'
import {Sales} from "../../models/reports/Sales.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/reports/sales`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;
export const getSalesReport = async (): Promise<Sales | AxiosError | undefined> => {
    return await axios.get(ENDPOINT)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}