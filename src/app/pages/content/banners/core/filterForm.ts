import * as Yup from 'yup';

export interface FilterFields {
    title?: string
}

export const defaultFilterFields = {title: ''}

export const FilterSchema = Yup.object().shape({
    title: Yup.string().notRequired()
});