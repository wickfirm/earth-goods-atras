import {Response} from '../../../_metronic/helpers';
import {Currency} from "../misc/Currency.ts";
import {DiscountType, MediaType, Status} from "./Options.ts";
import {Category} from "./Category.ts";
import {LocalizedStrings} from "../LocalizedStrings.ts";
import {NutritionalAttribute} from "./NutritionalAttribute.ts";
import {Claim} from "./Claim.ts";
import {Ingredient} from "./Ingredient.ts";
import {Highlight} from "./Highlight.ts";
import {Lifestyle} from "./Lifestyle.ts";
import {ResponsiveImage} from "../ResponsiveImage.ts";

export type ProductGallery = {
    id: number;
    is_featured: boolean;
    media_type: MediaType;
    media: ResponsiveImage;
}

export type ProductNutrition = {
    id: number;
    serving_size: string;
    nutritionInfo: ProductNutritionInfo[];
}

export type ProductNutritionInfo = {
    id: number;
    attribute: NutritionalAttribute;
    quantity: number;
}

export type ProductCondensed = {
    id: number;
    name: string;
}

export type ProductUploadedFile = {
    id: number;
    file: string;
    file_name: string;
    file_size: number;
}

export type Product = {
    id: number;
    name: LocalizedStrings;
    description: LocalizedStrings;
    ingredient: LocalizedStrings;
    how_to_enjoy: LocalizedStrings;
    thumbnail: ProductGallery;
    sku: string;
    available_qty: number;
    price: number;
    currency: Currency;
    rating: string;
    is_featured: number;
    hide: number;
    status: Status;
    category: Category;
    lifestyle: Lifestyle;
    gallery: ProductGallery[];
    discount_type: DiscountType;
    discount_value: number;
    meta_tag_title: LocalizedStrings;
    meta_tag_description: LocalizedStrings;
    meta_tag_keywords: LocalizedStrings;
    nutrition: ProductNutrition;
    lifestyles: Lifestyle[];
    claims: Claim[];
    omittedIngredients: Ingredient[];
    pairedProducts: ProductCondensed[];
    highlights: Highlight[];
};

export type SavedProduct = {
    id: number;
    product: Product;
    quantity: number;
    unit_price: number;
    discounted_price: number;
    added_to_cart: number;
    created_at: string;
}

export type ProductPaginate = Response<Product[]>;
export type ProductUploadedFilePaginate = Response<ProductUploadedFile[]>;