import {Response} from '../../../_metronic/helpers';
import {Country} from "./Country.ts";
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type City = {
    id: number;
    name: LocalizedStrings;
    country: Country;
};

export type CityPaginate = Response<City[]>;