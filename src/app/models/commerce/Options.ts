import {Response} from '../../../_metronic/helpers'
import {Category} from "./Category.ts";
import {Tag} from "./Tag.ts";
import {Claim} from "./Claim.ts";
import {Ingredient} from "./Ingredient.ts";
import {Lifestyle} from "./Lifestyle.ts";
import {NutritionalAttribute} from "./NutritionalAttribute.ts";
import {Highlight} from "./Highlight.ts";

export type Status = {
    id: string
    name: string
}

export type MediaType = {
    id: string
    name: string
}

export type DiscountType = {
    id: string
    name: string
}

export type DiscountCodeStatus = {
    id: string
    name: string
}

export type AddressType = {
    id: string
    name: string
}

export type ProductOptions = {
    statuses: Status[]
    productStatuses: Status[]
    categories: Category[]
    highlights: Highlight[]
    tags: Tag[]
    claims: Claim[]
    ingredients: Ingredient[]
    lifestyles: Lifestyle[]
    attributes: NutritionalAttribute[]
    discountTypes: DiscountType[]
    discountCodeStatuses: DiscountCodeStatus[]
}

export type ProductOptionsPaginate = Response<ProductOptions[]>
