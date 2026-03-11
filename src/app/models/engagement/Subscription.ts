import {Response} from '../../../_metronic/helpers';

export type Subscription = {
    id: number;
    email: string;
    review: string;
    unsubscribed: number;
    created_at: string;
};

export type SubscriptionPaginate = Response<Subscription[]>;