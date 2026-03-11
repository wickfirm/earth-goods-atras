import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Enquiry = {
    id: number;
    name: LocalizedStrings;
};

export type EnquiryPaginate = Response<Enquiry[]>;