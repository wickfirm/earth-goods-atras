import {Response} from '../../../_metronic/helpers';
import {SectionType} from "./Options.ts";
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../LocalizedStrings.ts";
import {DEFAULT_RESPONSIVE_IMAGE, ResponsiveImage} from "../ResponsiveImage.ts";

export type Page = {
    id: number;
    name: LocalizedStrings;
    sections: Section[];
};

export type Section = {
    id: number;
    name: LocalizedStrings;
    type: SectionType;
    order: number;
    data: SectionData[];
};

export type SectionData = {
    id: number;
    title: LocalizedStrings;
    subtitle: LocalizedStrings;
    description: LocalizedStrings;
    content: LocalizedStrings;
    cta_text: LocalizedStrings;
    cta_link: LocalizedStrings;
    background_color: string;
    carousel_speed: number;
    main_image: ResponsiveImage;
    main_image_mobile: ResponsiveImage;
    icon: string;
    floating_image_left: string;
    floating_image_right: string;
    sticker: string;
    tags: string;
    hide: number
};

export type PagePaginate = Response<Page[]>;
export type SectionPaginate = Response<Section[]>;
export type SectionDataPaginate = Response<SectionData[]>;

export const defaultSectionDatum: SectionData = {
    id: 0,
    title: DEFAULT_LOCALIZED_STRINGS,
    subtitle: DEFAULT_LOCALIZED_STRINGS,
    content: DEFAULT_LOCALIZED_STRINGS,
    description: DEFAULT_LOCALIZED_STRINGS,
    cta_link: DEFAULT_LOCALIZED_STRINGS,
    cta_text: DEFAULT_LOCALIZED_STRINGS,
    background_color: "",
    carousel_speed: 0,
    floating_image_left: "",
    floating_image_right: "",
    icon: "",
    main_image: DEFAULT_RESPONSIVE_IMAGE,
    main_image_mobile: DEFAULT_RESPONSIVE_IMAGE,
    sticker: "",
    tags: "",
    hide: 0
}