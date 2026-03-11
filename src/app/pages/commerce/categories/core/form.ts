import * as Yup from 'yup'
import {SUPPORTED_IMAGE_FORMATS} from "../../../../helpers/form.ts";
import {Category} from "../../../../models/commerce/Category.ts";
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {ResponsiveImage} from "../../../../models/ResponsiveImage.ts";

export interface FormFields {
    name: LocalizedStrings | string;
    menu_thumbnail: File | undefined | string | ResponsiveImage;
    homepage_thumbnail: File | undefined | string | ResponsiveImage;
    shop_thumbnail: File | undefined | string | ResponsiveImage;
    parent_id?: number
}

export const defaultFormFields: FormFields = {
    name: DEFAULT_LOCALIZED_STRINGS,
    menu_thumbnail: undefined,
    homepage_thumbnail: undefined,
    shop_thumbnail: undefined
}

export const categorySchema = (isEdit: boolean) => {
    const schema = {
        name: Yup.object().shape({
            en: Yup.string().required('name in English is required'),
            // ar: Yup.string().required('name in Arabic is required'),
            // fr: Yup.string().required('name in French is required'),
        }),
        parent_id: Yup.number().notRequired(),
        ...(
            !isEdit ? {
                menu_thumbnail: Yup.mixed().nullable().required('menu thumbnail is a required field').test('fileType', 'The file must be an image of type .jpg .jpeg .gif or .png', (value: any) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))),
                homepage_thumbnail: Yup.mixed().nullable().required('homepage thumbnail is a required field').test('fileType', 'The file must be an image of type .jpg .jpeg .gif or .png', (value: any) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))),
                shop_thumbnail: Yup.mixed().nullable().required('shop banner is a required field').test('fileType', 'The file must be an image of type .jpg .jpeg .gif or .png', (value: any) => !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))),
            } : {}
        ),
    }

    return Yup.object().shape(schema)
}


export function fillEditForm(category: Category) {
    const form: FormFields = {
        ...category,
        parent_id: category.parent?.id,
    }

    return form
}