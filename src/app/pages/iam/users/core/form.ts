import * as Yup from 'yup'
import {User} from "../../../../models/iam/User.ts";
import {SUPPORTED_IMAGE_FORMATS} from "../../../../helpers/form.ts";

export interface FormFields {
    name: string,
    password?: string,
    password_confirmation?: string,
    email: string,
    image?: File,
    imageSrc?: string,
    role_ids: number[]
}

export const defaultFormFields: FormFields = {
    name: '',
    password: '',
    password_confirmation: '',
    email: '',
    image: undefined,
    role_ids: []
}

export const userSchema = (isEdit?: boolean) => {
    const schema = {
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        ...(!isEdit ?
                {
                    password: Yup.string().required().min(6, 'The password must be at least 6 characters.'),
                    password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Passwords do not match."),
                } : {}
        ),
        image: Yup.mixed().nullable().notRequired().test('fileType', 'The file must be an image of type .jpg .jpeg .gif or .png', (value: any) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))),
        role_ids: Yup.array().of(Yup.number()).required().min(1, 'You must select at least one role.')
    }

    return Yup.object().shape(schema)
}


export function fillEditForm(user: User) {
    const form: FormFields = {
        ...user,
        image: undefined,
        imageSrc: user.image,
        role_ids: user.roles.map((role) => role.id)
    }

    return form
}
