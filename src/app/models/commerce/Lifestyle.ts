import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Lifestyle = {
    id: number;
    name: LocalizedStrings;
    slug: string;
};

export type LifestylePaginate = Response<Lifestyle[]>;