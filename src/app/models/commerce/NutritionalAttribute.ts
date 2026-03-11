import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type NutritionalAttribute = {
    id: number;
    name: LocalizedStrings;
    slug: string;
};

export type NutritionalAttributePaginate = Response<NutritionalAttribute[]>;