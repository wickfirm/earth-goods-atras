import {Response} from '../../../_metronic/helpers';
import {User} from "../iam/User.ts";
import {LocalizedStrings} from "../LocalizedStrings.ts";
import {ResponsiveImage} from "../ResponsiveImage.ts";

export interface BlogTag {
    id: number;
    key: string;
    value: string;
}

export interface BlogContentSection {
    id: number;
    column_count: number;
    content: string[];
}

export type Blog = {
    id: number;
    title: LocalizedStrings;
    description: LocalizedStrings;
    featured_image: ResponsiveImage;
    banner: ResponsiveImage;
    author: User;
    tags: BlogTag[];
    contentSections: BlogContentSection[];
    meta_tag_title: LocalizedStrings;
    meta_tag_description: LocalizedStrings;
    meta_tag_keywords: LocalizedStrings;
};

export type BlogPaginate = Response<Blog[]>;