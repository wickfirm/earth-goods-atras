import * as Yup from 'yup'
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../models/LocalizedStrings.ts";
import {DEFAULT_RESPONSIVE_IMAGE, ResponsiveImage} from "../../../../models/ResponsiveImage.ts";
import {Blog} from "../../../../models/content/Blog.ts";

export interface FormFields {
    title: LocalizedStrings,
    description: LocalizedStrings,
    featured_image?: ResponsiveImage,
    banner?: ResponsiveImage,
    author_id: number,
    tags: {
        key: string;
        value: string;
    }[];
    contentSections: {
        columns: number;
        contents: string[];
    }[];
    meta_tag_title?: LocalizedStrings;
    meta_tag_description?: LocalizedStrings;
    meta_tag_keywords?: LocalizedStrings;
}

export const defaultFormFields: FormFields = {
    title: DEFAULT_LOCALIZED_STRINGS,
    description: DEFAULT_LOCALIZED_STRINGS,
    featured_image: DEFAULT_RESPONSIVE_IMAGE,
    banner: DEFAULT_RESPONSIVE_IMAGE,
    author_id: 0,
    tags: [],
    contentSections: []
}

export const blogSchema = () => {
    const schema = {
        title: Yup.object().shape({
            en: Yup.string().required('title in English is required'),
            // ar: Yup.string().required('title in Arabic is required'),
            // fr: Yup.string().required('title in French is required'),
        })
    }

    return Yup.object().shape(schema)
}

export function fillEditForm(blog: Blog) {
    const {author, tags, contentSections, meta_tag_title, meta_tag_description, ...currentBlog} = blog

    const form: FormFields = {
        author_id: author?.id,
        tags: tags.map((tag) => ({key: tag.key, value: tag.value})),
        contentSections: contentSections.map((contentSection) => ({
            columns: contentSection.column_count,
            contents: contentSection.content
        })),
        meta_tag_title: {
            en: meta_tag_title?.en || '',
            ar: meta_tag_title?.ar || '',
            fr: meta_tag_title?.fr || '',
        },
        meta_tag_description: {
            en: meta_tag_description?.en || '',
            ar: meta_tag_description?.ar || '',
            fr: meta_tag_description?.fr || '',
        },
        ...currentBlog
    }

    return form;
}