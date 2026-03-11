import {Response} from '../../../_metronic/helpers';

export type PaymentRequest = {
    id: number;
    stripe_checkout_session_id: string;
    status: string;
    request_data: object;
    payment_method: string;
    payment_method_details: string;
    paymentResponse: PaymentResponse;
};

export type PaymentRequestPaginate = Response<PaymentRequest[]>;

export type PaymentResponse = {
    id: number;
    status: string;
    payment_status: string;
    response: string;
    created_at: string;
    updated_at: string;
};

export type PaymentResponsePaginate = Response<PaymentResponse[]>;