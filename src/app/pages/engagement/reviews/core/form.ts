import * as Yup from 'yup'

export interface FormFields {
    is_valid: number;
}

export const defaultFormFields: FormFields = {
    is_valid: 0
}

export const reviewSchema = () => {
    const schema = {}

    return Yup.object().shape(schema)
}