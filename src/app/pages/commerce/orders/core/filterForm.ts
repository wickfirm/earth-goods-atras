import * as Yup from 'yup';

export interface FilterFields {
    iq_client_reference?: string
}

export const defaultFilterFields = {iq_client_reference: ''}

export const FilterSchema = Yup.object().shape({
    iq_client_reference: Yup.string().notRequired()
});