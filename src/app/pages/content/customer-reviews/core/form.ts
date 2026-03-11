import * as Yup from 'yup'
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {CustomerReview} from "../../../../models/content/CustomerReview.ts";

export interface FormFields {
    name: LocalizedStrings,
    review: LocalizedStrings,
    gender: string,
    rating: number,
}

export const defaultFormFields: FormFields = {
    name: DEFAULT_LOCALIZED_STRINGS,
    review: DEFAULT_LOCALIZED_STRINGS,
    gender: '',
    rating: 0
}

export const customerReviewSchema = () => {
    const schema = {
        name: Yup.object().shape({
            en: Yup.string().required('name in English is required'),
            // ar: Yup.string().required('name in Arabic is required'),
            // fr: Yup.string().required('name in French is required'),
        }),
        review: Yup.object().shape({
            en: Yup.string().required('review in English is required'),
            // ar: Yup.string().required('review in Arabic is required'),
            // fr: Yup.string().required('review in French is required'),
        }),
        gender: Yup.string().required('gender is required'),
    }

    return Yup.object().shape(schema)
}

export function fillEditForm(customerReview: CustomerReview) {
    const {
        gender,
        ...currentCustomerReview
    } = customerReview

    const form: FormFields = {
        gender: gender.id,
        ...currentCustomerReview
    }

    return form;
}