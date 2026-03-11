import * as Yup from 'yup';

export interface FilterFields {
    code?: string;
    type?: string;
}

export const defaultFilterFields = {code: ''}

export const FilterSchema = Yup.object().shape({
    code: Yup.string().notRequired()
});