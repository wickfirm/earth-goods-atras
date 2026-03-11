import {Response} from '../../../_metronic/helpers';
import {User} from "../iam/User.ts";
import {Product} from "../commerce/Product.ts";

export type Review = {
    id: number;
    name: string;
    email: string;
    review: string;
    rating: string;
    user: User;
    is_verified_buyer: boolean;
    is_valid: boolean|number;
    product: Product;
};

export type ReviewPaginate = Response<Review[]>;