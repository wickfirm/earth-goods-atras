import * as Yup from 'yup'
import {Recipe} from "../../../../models/content/Recipe.ts";
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {DEFAULT_RESPONSIVE_IMAGE, ResponsiveImage} from "../../../../models/ResponsiveImage.ts";

export interface FormFields {
    title: LocalizedStrings,
    description: LocalizedStrings,
    featured_image?: ResponsiveImage,
    banner?: ResponsiveImage,
    product_ids: number[],
    collection_id: number,
    collection_ids: number[],
    tags: {
        key: string;
        value: string;
    }[];
    contentSections: {
        columns: number;
        contents: string[];
    }[];
    meta_tag_title?: LocalizedStrings;
    meta_tag_description?: LocalizedStrings;
    meta_tag_keywords?: LocalizedStrings;
}

export const defaultFormFields: FormFields = {
    title: DEFAULT_LOCALIZED_STRINGS,
    description: DEFAULT_LOCALIZED_STRINGS,
    featured_image: DEFAULT_RESPONSIVE_IMAGE,
    banner: DEFAULT_RESPONSIVE_IMAGE,
    product_ids: [],
    collection_id: 0,
    collection_ids: [],
    tags: [],
    contentSections: []
}

export const recipeSchema = () => {
    const schema = {
        title: Yup.object().shape({
            en: Yup.string().required('title in English is required'),
            // ar: Yup.string().required('title in Arabic is required'),
            // fr: Yup.string().required('title in French is required'),
        })
    }

    return Yup.object().shape(schema)
}

export function fillEditForm(recipe: Recipe) {
    const {products, collection, collections, tags, contentSections, meta_tag_title, meta_tag_description, ...currentRecipe} = recipe

    const form: FormFields = {
        product_ids: products?.map(
            (product) => product.id
        ),
        collection_id: collection.id,
        collection_ids: collections.map((collection) => collection.id),
        tags: tags.map((tag) => ({key: tag.key, value: tag.value})),
        contentSections: contentSections.map((contentSection) => ({
            columns: contentSection.column_count,
            contents: contentSection.content
        })),
        meta_tag_title: {
            en: meta_tag_title?.en || '',
            ar: meta_tag_title?.ar || '',
            fr: meta_tag_title?.fr || '',
        },
        meta_tag_description: {
            en: meta_tag_description?.en || '',
            ar: meta_tag_description?.ar || '',
            fr: meta_tag_description?.fr || '',
        },
        ...currentRecipe
    }

    return form;
}