import * as Yup from 'yup'
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";

export interface FormFields {
    question: LocalizedStrings,
    answer: LocalizedStrings,
    is_active: number
}

export const defaultFormFields: FormFields = {
    question: DEFAULT_LOCALIZED_STRINGS,
    answer: DEFAULT_LOCALIZED_STRINGS,
    is_active: 1,
}

export const faqSchema = () => {
    const schema = {
        question: Yup.object().shape({
            en: Yup.string().required('question in English is required'),
            // ar: Yup.string().required('question in Arabic is required'),
            // fr: Yup.string().required('question in French is required'),
        }),
        answer: Yup.object().shape({
            en: Yup.string().required('answer in English is required'),
            // ar: Yup.string().required('answer in Arabic is required'),
            // fr: Yup.string().required('answer in French is required'),
        })
    }

    return Yup.object().shape(schema)
}