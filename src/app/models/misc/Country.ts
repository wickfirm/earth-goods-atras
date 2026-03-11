import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Country = {
    id: number;
    name: LocalizedStrings;
    code: string;
    currency: string;
    phone_code: string;
};

export type CountryPaginate = Response<Country[]>;