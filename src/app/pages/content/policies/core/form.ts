import * as Yup from 'yup'
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {Policy} from "../../../../models/content/Policy.ts";

export interface FormFields {
    title: LocalizedStrings;
    content: LocalizedStrings;
}

export const defaultFormFields: FormFields = {
    title: DEFAULT_LOCALIZED_STRINGS,
    content: DEFAULT_LOCALIZED_STRINGS,
}

export const policySchema = () => {
    const schema = {
        title: Yup.object().shape({
            en: Yup.string().required('title in English is required'),
            // ar: Yup.string().required('title in Arabic is required'),
            // fr: Yup.string().required('title in French is required'),
        })
    }

    return Yup.object().shape(schema)
}

export function fillEditForm(policy: Policy) {
    const form: FormFields = {
        ...policy
    }

    return form;
}