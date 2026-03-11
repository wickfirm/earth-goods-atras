import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Faq = {
    id: number;
    question: LocalizedStrings;
    answer: LocalizedStrings;
    is_active: string;
};

export type FaqPaginate = Response<Faq[]>;