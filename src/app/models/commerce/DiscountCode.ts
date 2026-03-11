import {Response} from '../../../_metronic/helpers';
import {DiscountType} from "./Options.ts";

export type DiscountStatus = {
    id: string
    name: string
}

export type DiscountCode = {
    id: number;
    stripe_coupon_id: string;
    code: string;
    type: DiscountType;
    value: number;
    start_date: string;
    expiration_date: string;
    status: DiscountStatus;
    redemptions: number;
};

export type DiscountCodePaginate = Response<DiscountCode[]>;