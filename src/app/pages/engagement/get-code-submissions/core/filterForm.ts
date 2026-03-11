import * as Yup from 'yup';

export interface FilterFields {
    email?: string
}

export const defaultFilterFields = {email: ''}

export const FilterSchema = Yup.object().shape({
    email: Yup.string().notRequired()
});