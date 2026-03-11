import * as Yup from 'yup'

export interface FormFields {
    discount_type: string;
    discount_percentage?: number;
    discount_target_type: string;
    discount_fixed_price?: number;
    category_ids: number[];
    except_product_ids: number[];
    product_ids: number[];
}

export const defaultFormFields: FormFields = {
    discount_target_type: '',
    discount_type: '',
    discount_percentage: 0,
    discount_fixed_price: 0,
    category_ids: [],
    except_product_ids: [],
    product_ids: []
}

export const bulkDiscountSchema = () => {
    const schema = {}

    return Yup.object().shape(schema)
}