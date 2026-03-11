import {Response} from '../../../_metronic/helpers';
import {LocalizedStrings} from "../LocalizedStrings.ts";
import {CtaType, Page} from "../Options.ts";

export type Banner = {
    id: number;

    name: LocalizedStrings;

    title: LocalizedStrings;
    description: LocalizedStrings;

    start_date: string;
    end_date: string;

    status: number;

    page: Page;

    background_image: string;
    floating_image_left: string;
    floating_image_right: string;

    cta_text: LocalizedStrings;
    cta_type: CtaType;
    cta_link: string;
    cta_page_link: Page;
    cta_background_color: string;
    cta_text_color: string;
};

export type BannerPaginate = Response<Banner[]>;