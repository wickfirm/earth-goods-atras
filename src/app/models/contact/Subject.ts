import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Subject = {
    id: number;
    name: LocalizedStrings;
};

export type SubjectPaginate = Response<Subject[]>;