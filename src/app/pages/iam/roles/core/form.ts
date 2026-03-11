import * as Yup from 'yup'
import {Role} from "../../../../models/iam/Role.ts";

export interface FormFields {
    name: string,
    permission_ids: number[]
}

export const defaultFormFields: FormFields = {
    name: '',
    permission_ids: []
}

export const roleSchema = () => {
    const schema = {
        name: Yup.string().required(),
        permission_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one permission.')
    }

    return Yup.object().shape(schema)
}


export function fillEditForm(role: Role) {
    const form: FormFields = {
        ...role,
        permission_ids: role.permissions.map((permission) => permission.id),
    }

    return form
}
