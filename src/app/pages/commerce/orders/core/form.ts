import * as Yup from 'yup'

export interface FormFields {
}

export const defaultFormFields: FormFields = {}

export const orderSchema = () => {
    const schema = {}

    return Yup.object().shape(schema)
}