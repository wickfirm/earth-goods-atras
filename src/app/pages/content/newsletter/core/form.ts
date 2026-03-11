import * as Yup from 'yup'
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {ResponsiveImage} from "../../../../models/ResponsiveImage.ts";
import {Newsletter} from "../../../../models/content/Newsletter.ts";

export interface FormFields {
    title: LocalizedStrings | string;
    subtitle: LocalizedStrings | string;
    description: LocalizedStrings | string;
    background_image: File | undefined | ResponsiveImage | string;
    background_image_mobile: File | undefined | string;
    is_active: number;
    discount_code_id: number;
}

export const defaultFormFields: FormFields = {
    title: DEFAULT_LOCALIZED_STRINGS,
    subtitle: DEFAULT_LOCALIZED_STRINGS,
    description: DEFAULT_LOCALIZED_STRINGS,
    background_image: undefined,
    background_image_mobile: undefined,
    is_active: 1,
    discount_code_id: 1,
}

export const newsletterSchema = () => {
    const schema = {
        title: Yup.object().shape({
            en: Yup.string().required('title in English is required'),
            // ar: Yup.string().required('title in Arabic is required'),
            // fr: Yup.string().required('title in French is required'),
        }),
        subtitle: Yup.object().shape({
            en: Yup.string().required('subtitle in English is required'),
            // ar: Yup.string().required('title in Arabic is required'),
            // fr: Yup.string().required('title in French is required'),
        }),
        description: Yup.object().shape({
            en: Yup.string().required('description in English is required'),
            // ar: Yup.string().required('title in Arabic is required'),
            // fr: Yup.string().required('title in French is required'),
        }),
        discount_code_id: Yup.number().min(1, 'discount code is a required field').required(),
    }

    return Yup.object().shape(schema)
}


export function fillEditForm(newsletter: Newsletter) {
    const {discountCode, ...currentNewsletter} = newsletter

    const form: FormFields = {
        discount_code_id: discountCode?.id,
        ...currentNewsletter
    }

    return form
}