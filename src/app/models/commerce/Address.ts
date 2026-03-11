import {Response} from '../../../_metronic/helpers';
import {AddressType} from "./Options.ts";

export type Address = {
    id: number;
    type: AddressType;
    address: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    zip_code: string;
};

export type AddressPaginate = Response<Address[]>;