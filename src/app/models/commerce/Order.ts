import {Response} from '../../../_metronic/helpers';
import {Address} from "./Address.ts";
import {PaymentRequest} from "./Payment.ts";
import {DiscountType} from "./Options.ts";
import {Product} from "./Product.ts";
import {CustomerCondensed} from "./Customer.ts";
import {Payout, PayoutData} from "./Payout.ts";

export type Order = {
    id: number;
    status: string;
    status_history: string;
    customer: CustomerCondensed;
    name: string | null;
    email: string | null;
    phone: string | null;
    order_number: string;
    billingAddress: Address;
    shippingAddress: Address;
    subtotal_price: number;
    total_price: number|string;
    shipping: number;
    savings: number;
    discount: number;
    iq_client_reference: string;
    iq_response: string;
    paymentRequest: PaymentRequest;
    products: OrderProduct[];
    payout: PayoutData | null,
    created_at: string;
};

export type OrderProduct = {
    id: number;
    quantity: number;
    single_price: number;
    subtotal_price: number;
    total_price: number;
    discount_type: DiscountType;
    discount_value: number;
    product: Product;
}

export type OrderHistory = {
    status: string;
    date: string;
    comment: string;
}

export type IQOrder = {
    id: number;
    order_id: string;
    client_reference: string;
    data: string;
    created_at: string;
    updated_at: string;
}

export type OrderPaginate = Response<Order[]>;