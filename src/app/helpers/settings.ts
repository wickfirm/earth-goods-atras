import {ProductOptions} from "../models/commerce/Options.ts";
import {Options} from "../models/Options.ts";

export const DEFAULT_LANGUAGE = 'en'
export const DEFAULT_RESPONSIVE_IMAGE_SIZE = 'xl'
export const SM_RESPONSIVE_IMAGE_SIZE = 'sm'

export const DEFAULT_OPTIONS: Options = {
    languages: [],
    genders: [],
    pages: [],
    ctaTypes: []
}

export const DEFAULT_PRODUCT_OPTIONS: ProductOptions = {
    statuses: [],
    productStatuses: [],
    categories: [],
    highlights: [],
    tags: [],
    claims: [],
    ingredients: [],
    lifestyles: [],
    attributes: [],
    discountTypes: [],
    discountCodeStatuses: []
}