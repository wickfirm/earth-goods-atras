import {Response} from '../../../_metronic/helpers';
import {Product} from "../commerce/Product.ts";
import {LocalizedStrings} from "../LocalizedStrings.ts";
import {Collection} from "../misc/Collection.ts";
import {ResponsiveImage} from "../ResponsiveImage.ts";

export interface RecipeTag {
    id: number;
    key: string;
    value: string;
}

export interface RecipeContentSection {
    id: number;
    column_count: number;
    content: string[];
}

export type Recipe = {
    id: number;
    title: LocalizedStrings;
    description: LocalizedStrings;
    featured_image: ResponsiveImage;
    banner: ResponsiveImage;
    products: Product[];
    collection: Collection;
    collections: Collection[];
    tags: RecipeTag[];
    contentSections: RecipeContentSection[];
    meta_tag_title: LocalizedStrings;
    meta_tag_description: LocalizedStrings;
    meta_tag_keywords: LocalizedStrings;
};

export type RecipePaginate = Response<Recipe[]>;