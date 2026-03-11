import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type PolicyType = {
    id: string;
    name: string;
}

export type Policy = {
    id: number;
    type: PolicyType;
    title: LocalizedStrings;
    content: LocalizedStrings;

};

export type PolicyPaginate = Response<Policy[]>;