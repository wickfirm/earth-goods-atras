import * as Yup from 'yup'
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {Banner} from "../../../../models/content/Banner.ts";

export interface FormFields {
    name: LocalizedStrings;
    title: LocalizedStrings;
    description: LocalizedStrings;
    start_date: string;
    end_date: string;
    status: number;
    page: string;
    background_image: string;
    floating_image_left: string;
    floating_image_right: string;
    cta_text: LocalizedStrings;
    cta_type: string;
    cta_link: string;
    cta_page_link: string;
    cta_background_color: string;
    cta_text_color: string;
}

export const defaultFormFields: FormFields = {
    background_image: "",
    cta_background_color: "",
    cta_link: "",
    cta_page_link: "",
    cta_text: DEFAULT_LOCALIZED_STRINGS,
    cta_text_color: "",
    end_date: "",
    floating_image_left: "",
    floating_image_right: "",
    name: DEFAULT_LOCALIZED_STRINGS,
    start_date: "",
    status: 0,
    title: DEFAULT_LOCALIZED_STRINGS,
    description: DEFAULT_LOCALIZED_STRINGS,
    cta_type: "",
    page: ""
}

export const bannerSchema = () => {
    const schema = {
        name: Yup.object().shape({
            en: Yup.string().required('name in English is required'),
            // ar: Yup.string().required('name in Arabic is required'),
            // fr: Yup.string().required('name in French is required'),
        }),
        title: Yup.object().shape({
            en: Yup.string().required('title in English is required'),
            // ar: Yup.string().required('title in Arabic is required'),
            // fr: Yup.string().required('title in French is required'),
        }),
        description: Yup.object().shape({
            en: Yup.string().required('description in English is required'),
            // ar: Yup.string().required('description in Arabic is required'),
            // fr: Yup.string().required('description in French is required'),
        }),
        start_date: Yup.string().required('start date is required'),
        end_date: Yup.string().required('end date is required'),
        // page: Yup.string().required('page is required'),
        cta_text: Yup.object().shape({
            en: Yup.string().required('cta text in English is required'),
            // ar: Yup.string().required('cta text in Arabic is required'),
            // fr: Yup.string().required('cta text in French is required'),
        })
    }

    return Yup.object().shape(schema)
}

export function fillEditForm(banner: Banner) {
    const {cta_type, page, cta_page_link, ...currentBanner} = banner;

    const form: FormFields = {
        cta_type: cta_type.id,
        page: page.id,
        cta_page_link: cta_page_link?.id ?? '',
        ...currentBanner
    }

    return form;
}