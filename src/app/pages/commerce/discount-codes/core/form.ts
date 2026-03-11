import * as Yup from 'yup'

export interface FormFields {
    stripe_coupon_id: string;
    code: string;
    type: string;
    value: number;
    start_date: string;
    expiration_date: string;
    status: string;
}

export const defaultFormFields: FormFields = {
    stripe_coupon_id: '',
    code: '',
    type: '',
    value: 0,
    start_date: '',
    expiration_date: '',
    status: ''
}

export const discountCodeSchema = () => {
    const schema = {
        code: Yup.string()
            .required('Code is required')
            .max(50, 'Code must be at most 50 characters long'),
        type: Yup.string()
            .required('Type is required')
            .oneOf(['no_discount', 'percentage', 'fixed'], 'Invalid type'), // Adjust options as per your requirement
        value: Yup.number()
            .required('Value is required')
            .positive('Value must be a positive number')
            .integer('Value must be an integer'),
        // start_date: Yup.string()
        //     .required('Start date is required'),
        expiration_date: Yup.string()
            .required('Expiration date is required'),
        // status: Yup.string()
        //     .required('Status is required')
        //     .oneOf(['active', 'in_active', 'expired'], 'Invalid status'),
    }

    return Yup.object().shape(schema)
}