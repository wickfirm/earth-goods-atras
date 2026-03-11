import * as Yup from 'yup'

export interface FormFields {
    name: string
}

export const defaultFormFields: FormFields = {
    name: ''
}

export const paymentMethodSchema = () => {
    const schema = {
        name: Yup.string().required()
    }

    return Yup.object().shape(schema)
}