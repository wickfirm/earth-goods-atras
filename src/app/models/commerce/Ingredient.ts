import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";

export type Ingredient = {
    id: number;
    name: LocalizedStrings;
    icon: string;
    slug: string;
};

export type IngredientPaginate = Response<Ingredient[]>;