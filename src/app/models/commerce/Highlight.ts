import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Highlight = {
    id: number;
    name: LocalizedStrings;
    slug: string;
};

export type HighlightPaginate = Response<Highlight[]>;