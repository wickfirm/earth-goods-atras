import {Response} from '../../../_metronic/helpers';
import {User} from "../iam/User.ts";
import {Order} from "./Order.ts";
import {SavedProduct} from "./Product.ts";
import {Address} from "./Address.ts";

export type Customer = {
    id: number;
    user: User;
    session_token: string | null;
    account_id: string;
    name: string;
    email: string;
    order_count: number;
    orders: Order[];
    savedProducts: SavedProduct[];
    addresses: Address[];
};

export type CustomerCondensed = {
    id: number;
    user: User;
    session_id: string | null;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
};

export type CustomerV2 = {
    name: string;
    email: string;
    orders: Order[];
    // savedProducts: SavedProduct[];
    // addresses: Address[];
};

export type CustomerCondensedV2 = {
    name: string;
    email: string;
    order_count: number;
};

export type CustomerPaginate = Response<Customer[]>;
export type CustomerCondensedV2Paginate = Response<CustomerCondensedV2[]>;