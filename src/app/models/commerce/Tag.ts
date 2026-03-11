import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Tag = {
    id: number;
    name: LocalizedStrings;
    slug: string;
};

export type TagPaginate = Response<Tag[]>;