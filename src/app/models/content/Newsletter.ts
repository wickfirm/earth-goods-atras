import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";
import {ResponsiveImage} from "../ResponsiveImage.ts";
import {DiscountCode} from "../commerce/DiscountCode.ts";

export type Newsletter = {
    id: number;
    background_image: ResponsiveImage;
    background_image_mobile: string;
    title: LocalizedStrings;
    subtitle: LocalizedStrings;
    description: LocalizedStrings;
    is_active: number;
    discountCode: DiscountCode;
};

export type NewsletterPaginate = Response<Newsletter[]>;