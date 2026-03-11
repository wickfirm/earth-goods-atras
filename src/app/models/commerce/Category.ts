import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";
import {ResponsiveImage} from "../ResponsiveImage.ts";

export type Category = {
    id: number;
    name: LocalizedStrings;
    menu_thumbnail: ResponsiveImage;
    homepage_thumbnail: ResponsiveImage;
    shop_thumbnail: ResponsiveImage;
    parent: Category | null;
    slug: string;
    order: number
};

export type CategoryPaginate = Response<Category[]>;