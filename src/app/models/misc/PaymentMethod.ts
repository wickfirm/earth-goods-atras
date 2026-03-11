import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type PaymentMethod = {
    id: number;
    name: LocalizedStrings;
};

export type PaymentMethodPaginate = Response<PaymentMethod[]>;