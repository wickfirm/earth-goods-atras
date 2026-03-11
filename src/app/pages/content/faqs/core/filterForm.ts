import * as Yup from 'yup';

export interface FilterFields {
    question?: string;
    answer?: string;
}

export const defaultFilterFields = {question: ''}

export const FilterSchema = Yup.object().shape({
    question: Yup.string().notRequired()
});