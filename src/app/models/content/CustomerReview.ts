import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";
import {Gender} from "../Options.ts";

export type CustomerReview = {
    id: number;
    name: LocalizedStrings;
    review: LocalizedStrings;
    avatar: string;
    gender: Gender;
    rating: number;
    slug: string;
};

export type CustomerReviewPaginate = Response<CustomerReview[]>;