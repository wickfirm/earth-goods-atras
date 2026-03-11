import * as Yup from 'yup'
import {Product, ProductGallery} from "../../../../models/commerce/Product.ts";
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {ResponsiveImage} from "../../../../models/ResponsiveImage.ts";

export interface FormFields {
    thumbnail?: ResponsiveImage;
    status: string;
    category_id: number;
    lifestyle_id?: number;
    lifestyle_ids?: number[];
    is_featured: number;
    hide: number;

    name: LocalizedStrings;
    description: LocalizedStrings | null;
    ingredient: LocalizedStrings | null;
    how_to_enjoy: LocalizedStrings | null;
    media?: File[];
    gallery?: ProductGallery[] | null;
    removedMedia?: number[] | null;
    price: number;
    discount_type?: string;
    discount_percentage?: number;
    discount_fixed_price?: number;

    sku: string;
    meta_tag_title?: LocalizedStrings;
    meta_tag_description?: LocalizedStrings;
    meta_tag_keywords?: LocalizedStrings;

    serving_size?: number;
    attributes?: { attribute_id: number | null, quantity: string }[];

    claim_ids?: number[];
    omitted_ingredient_ids?: number[];
    paired_product_ids?: number[];
    highlight_ids?: number[];
}

export interface BulkFormFields {
    file: File | null;
    fileUrl?: string;
}

export const defaultFormFields: FormFields = {
    thumbnail: undefined,
    status: '',
    category_id: 0,
    is_featured: 0,
    hide:0,

    name: DEFAULT_LOCALIZED_STRINGS,
    description: DEFAULT_LOCALIZED_STRINGS,
    ingredient: DEFAULT_LOCALIZED_STRINGS,
    how_to_enjoy: DEFAULT_LOCALIZED_STRINGS,
    price: 0,
    discount_type: 'no_discount',
    discount_percentage: 0,
    discount_fixed_price: 0,

    sku: '',

    meta_tag_keywords: DEFAULT_LOCALIZED_STRINGS,
}

export const defaultBulkFormFields: BulkFormFields = {
    file: null
}

export const productSchema = () => {
    return Yup.object().shape({
        name: Yup.object().shape({
            en: Yup.string().required('Name in English is required'),
            // ar: Yup.string().notRequired(),
            // fr: Yup.string().notRequired(),
        }),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        sku: Yup.string().required('SKU is required'),
        // quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
        category_id: Yup.number().min(1, 'Category is required').required(),
        status: Yup.string().required('Status is required'),
        // discount_type: Yup.string().required('Discount type is required'),
        // discount_percentage: Yup.number()
        //     .when('discount_type', {
        //         is: '2', // Check if discount_type is '2'
        //         then: Yup.number()
        //             .required('Discount percentage is required')
        //             .min(1, 'Discount percentage must be at least 1%')
        //             .max(100, 'Discount percentage cannot exceed 100%'),
        //         otherwise: Yup.number().notRequired()
        //     }),
        // discount_fixed_price: Yup.number()
        //     .when('discount_type', {
        //         is: '3', // Check if discount_type is '3'
        //         then: Yup.number()
        //             .required('Discounted price is required')
        //             .positive('Discounted price must be a positive number'),
        //         otherwise: Yup.number().notRequired()
        //     })
    });
};

export const productAddBulkSchema = () => {
    return Yup.object().shape({});
};


export function fillEditForm(product: Product) {
    const {
        thumbnail,
        status,
        category,
        lifestyle,
        discount_type,
        meta_tag_title,
        meta_tag_description,
        meta_tag_keywords,
        nutrition,
        claims,
        omittedIngredients,
        pairedProducts,
        highlights,
        lifestyles,
        ...currentProduct
    } = product

    const transformedAttributes = nutrition?.nutritionInfo.map(item => ({
        attribute_id: item.attribute.id,
        quantity: item.quantity.toString()
    }));

    const form: FormFields = {
        thumbnail: thumbnail?.media,
        status: status.id,
        category_id: category.id,
        lifestyle_id: lifestyle?.id,
        discount_type: discount_type.id,
        meta_tag_title: meta_tag_title.en ? meta_tag_title : DEFAULT_LOCALIZED_STRINGS,
        meta_tag_description: meta_tag_description.en ? meta_tag_description : DEFAULT_LOCALIZED_STRINGS,
        meta_tag_keywords: meta_tag_keywords.en ? meta_tag_keywords : DEFAULT_LOCALIZED_STRINGS,
        serving_size: nutrition ? parseInt(nutrition.serving_size) : 0,
        attributes: nutrition?.nutritionInfo ? transformedAttributes : [],
        lifestyle_ids: lifestyles.map((lifestyle) => lifestyle.id),
        claim_ids: claims.map((claim) => claim.id),
        omitted_ingredient_ids: omittedIngredients.map((omittedIngredient) => omittedIngredient.id),
        paired_product_ids: pairedProducts.map((pairedProduct) => pairedProduct.id),
        highlight_ids: highlights.map((highlight) => highlight.id),
        ...currentProduct
    }

    return form;
}