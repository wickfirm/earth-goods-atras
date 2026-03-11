import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Claim = {
    id: number;
    name: LocalizedStrings;
    icon: LocalizedStrings;
    slug: string;
};

export type ClaimPaginate = Response<Claim[]>;