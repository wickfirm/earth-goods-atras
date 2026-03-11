import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Collection = {
    id: number;
    name: LocalizedStrings;
};

export type CollectionPaginate = Response<Collection[]>;