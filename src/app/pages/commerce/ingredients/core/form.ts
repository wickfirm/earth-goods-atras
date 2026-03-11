import * as Yup from 'yup'
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";

export interface FormFields {
    name: LocalizedStrings | string;
}

export const defaultFormFields: FormFields = {
    name: DEFAULT_LOCALIZED_STRINGS,
}

export const ingredientSchema = () => {
    const schema = {
        name: Yup.object().shape({
            en: Yup.string().required('name in English is required'),
            // ar: Yup.string().required('name in Arabic is required'),
            // fr: Yup.string().required('name in French is required'),
        }),
    }

    return Yup.object().shape(schema)
}