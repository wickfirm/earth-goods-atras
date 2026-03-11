import * as Yup from "yup";
import {DEFAULT_LOCALIZED_STRINGS, LocalizedStrings} from "../../../../../models/LocalizedStrings.ts";
import {ResponsiveImage} from "../../../../../models/ResponsiveImage.ts";

export interface SectionFormFields {
    title: LocalizedStrings;
    subtitle: LocalizedStrings;
    title_text_color?: string;
    subtitle_text_color?: string;
    cta_text: LocalizedStrings;
    cta_link: LocalizedStrings;
    background_color?: string;
    carousel_speed?: number;
    hide: number;
}

export interface ImageFields {
    floating_image_left?: File | string;
    floating_image_right?: File | string;
    main_image?: File | string | ResponsiveImage;
    main_image_mobile?: File | string | ResponsiveImage;
    sticker?: File | string;
}

export interface NewsletterSectionFormFields extends SectionFormFields, ImageFields {
}

export interface StorySectionFormFields extends SectionFormFields, ImageFields {
    description: LocalizedStrings;
    content: LocalizedStrings | null;
}

export interface PromotionalBannerSectionFormFields extends SectionFormFields, ImageFields {
    description: LocalizedStrings;
}

export interface PromotionalStripSectionFormFields {
    tags: string[];
    icon?: File | string;
}

export interface ReassuranceStripSectionFormFields extends Pick<SectionFormFields, "title" | "background_color"> {
    icon?: File | string;
    description: LocalizedStrings;
}

export interface HeaderBannerSectionFormFields extends SectionFormFields {
    icon?: File | string;
}

export interface HeroSectionFormFields extends SectionFormFields {
    main_image?: File | string | ResponsiveImage;
    main_image_mobile?: File | string | ResponsiveImage;
}

export interface OurStoryHeroSectionFormFields extends Pick<SectionFormFields, "title"> {
    description: LocalizedStrings;
    main_image?: File | string | ResponsiveImage;
}

export interface OurStoryAboutSectionFormFields extends Pick<SectionFormFields, "title"> {
    description: LocalizedStrings;
    content: LocalizedStrings;
    main_image?: File | string | ResponsiveImage;
}

export interface OurStoryMapSectionFormFields extends Pick<SectionFormFields, "title"> {
}

// Default values
export const defaultSectionFormFields: SectionFormFields = {
    title: DEFAULT_LOCALIZED_STRINGS,
    subtitle: DEFAULT_LOCALIZED_STRINGS,
    cta_text: DEFAULT_LOCALIZED_STRINGS,
    cta_link: DEFAULT_LOCALIZED_STRINGS,
    background_color: "",
    title_text_color: "",
    subtitle_text_color: "",
    carousel_speed: 0,
    hide: 0
};

export const defaultNewsletterSectionFormFields: NewsletterSectionFormFields = {
    ...defaultSectionFormFields,
};

export const defaultStorySectionFormFields: StorySectionFormFields = {
    ...defaultSectionFormFields,
    description: DEFAULT_LOCALIZED_STRINGS,
    content: DEFAULT_LOCALIZED_STRINGS,
};

export const defaultPromotionalBannerSectionFormFields: PromotionalBannerSectionFormFields = {
    ...defaultSectionFormFields,
    description: DEFAULT_LOCALIZED_STRINGS,
};

export const defaultPromotionalStripSectionFormFields: PromotionalStripSectionFormFields = {
    tags: [],
};

export const defaultReassuranceStripSectionFormFields: ReassuranceStripSectionFormFields = {
    title: DEFAULT_LOCALIZED_STRINGS,
    description: DEFAULT_LOCALIZED_STRINGS,
    icon: undefined
};

export const defaultHeaderBannerSectionFormFields: HeaderBannerSectionFormFields = {
    ...defaultSectionFormFields,
    carousel_speed: 25,
};

export const defaultHeroSectionFormFields: HeroSectionFormFields = {
    ...defaultSectionFormFields,
};

// Utility function to check file type
const fileTypeValidation = (fieldName: string) =>
    Yup.mixed()
        .required(`${fieldName} is required`)
        .test("fileType", "Unsupported File Format", (value) => {
            if (!value) return false;
            const supportedFormats = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/webp"];
            const file = value as File;
            return supportedFormats.includes(file.type);
        });

// Schema generator
export const sectionSchema = ({
                                  isStrip = false,
                                  isNewsletter = false,
                                  isStory = false,
                                  isPromoBanner = false,
                                  isReassuranceStrip = false,
                                  isHeaderBanner = false,
                                  isHero = false,
                                  floatingImageLeft = false,
                                  floatingImageRight = false,
                                  mainImage = false,
                                  icon = false,
                                  sticker = false,
                              }) => {
    if (isStrip) {
        return Yup.object().shape({});
    }

    const schema = {
        // title: Yup.object().shape({
        //     en: Yup.string().notRequired('title in English is required'),
        //     // ar: Yup.string().notRequired(),
        //     // fr: Yup.string().notRequired(),
        // }),
        // subtitle: Yup.object().shape({
        //     en: Yup.string().required('subtitle in English is required'),
        //     // ar: Yup.string().notRequired(),
        //     // fr: Yup.string().notRequired(),
        // }),
        ...(isNewsletter && {
            floating_image_left: floatingImageLeft ? Yup.mixed().notRequired() : fileTypeValidation("floating image left"),
            floating_image_right: floatingImageRight ? Yup.mixed().notRequired() : fileTypeValidation("floating image right"),
        }),
        ...(isStory && {
            content: Yup.object().shape({
                en: Yup.string().required('content in English is required'),
                // ar: Yup.string().notRequired(),
                // fr: Yup.string().notRequired(),
            }),
            main_image: mainImage ? Yup.mixed().notRequired() : fileTypeValidation("main image"),
            sticker: sticker ? Yup.mixed().notRequired() : fileTypeValidation("sticker"),
        }),
        ...(isPromoBanner && {
            main_image: mainImage ? Yup.mixed().notRequired() : fileTypeValidation("main image"),
            floating_image_left: floatingImageLeft ? Yup.mixed().notRequired() : fileTypeValidation("floating image left"),
            floating_image_right: floatingImageRight ? Yup.mixed().notRequired() : fileTypeValidation("floating image right"),
        }),
        ...(isReassuranceStrip && {
            subtitle: Yup.object().shape({
                en: Yup.string().notRequired(),
                // ar: Yup.string().notRequired(),
                // fr: Yup.string().notRequired()
            }),
            description: Yup.object().shape({
                en: Yup.string().required('description in English is required'),
                // ar: Yup.string().notRequired(),
                // fr: Yup.string().notRequired(),
            }),
            icon: fileTypeValidation("icon"),
        }),
        ...(isHeaderBanner && {
            subtitle: Yup.object().shape({
                en: Yup.string().notRequired(),
                // ar: Yup.string().notRequired(),
                // fr: Yup.string().notRequired()
            }),
        }),
        ...(isHero && {
            // subtitle: Yup.object().shape({
            //     en: Yup.string().required('subtitle in English is required'),
            //     // ar: Yup.string().notRequired(),
            //     // fr: Yup.string().notRequired()
            // }),
            main_image: fileTypeValidation("main image"),
        }),
    };

    return Yup.object().shape(schema);
};

export const ourStorySectionSchema = ({
                                          isHero = false,
                                          mainImage = false,
                                      }) => {
    const schema = {
        title: Yup.object().shape({
            en: Yup.string().required('title in English is required'),
            // ar: Yup.string().notRequired(),
            // fr: Yup.string().notRequired(),
        }),
        ...(isHero && {
            description: Yup.object().shape({
                en: Yup.string().required('description in English is required'),
                // ar: Yup.string().notRequired(),
                // fr: Yup.string().notRequired()
            }),
            main_image: mainImage ? Yup.mixed().notRequired() : fileTypeValidation("main image"),
        }),
    };

    return Yup.object().shape(schema);
};

// Mapping function to structure data as per defaultSectionFormFields
export const mapSectionDatumToSectionFormFields = (sectionDatum: any): SectionFormFields => {
    return {
        title: {
            en: sectionDatum.title?.en || '',
            ar: sectionDatum.title?.ar || '',
            fr: sectionDatum.title?.fr || '',
        },
        subtitle: {
            en: sectionDatum.subtitle?.en || '',
            ar: sectionDatum.subtitle?.ar || '',
            fr: sectionDatum.subtitle?.fr || '',
        },
        cta_text: {
            en: sectionDatum.cta_text?.en || '',
            ar: sectionDatum.cta_text?.ar || '',
            fr: sectionDatum.cta_text?.fr || '',
        },
        cta_link: {
            en: sectionDatum.cta_link?.en || '',
            ar: sectionDatum.cta_link?.ar || '',
            fr: sectionDatum.cta_link?.fr || '',
        },
        background_color: sectionDatum.background_color || '',
        carousel_speed: sectionDatum.carousel_speed ? sectionDatum.carousel_speed : 0,
        hide: sectionDatum.hide || 0
    };
};

export const mapSectionDatumToNewsletterSectionFormFields = (sectionDatum: any): NewsletterSectionFormFields => {
    return {
        title: {
            en: sectionDatum.title?.en || '',
            ar: sectionDatum.title?.ar || '',
            fr: sectionDatum.title?.fr || '',
        },
        subtitle: {
            en: sectionDatum.subtitle?.en || '',
            ar: sectionDatum.subtitle?.ar || '',
            fr: sectionDatum.subtitle?.fr || '',
        },
        cta_text: {
            en: sectionDatum.cta_text?.en || '',
            ar: sectionDatum.cta_text?.ar || '',
            fr: sectionDatum.cta_text?.fr || '',
        },
        cta_link: {
            en: sectionDatum.cta_link?.en || '',
            ar: sectionDatum.cta_link?.ar || '',
            fr: sectionDatum.cta_link?.fr || '',
        },
        background_color: sectionDatum.background_color || '',
        carousel_speed: sectionDatum.carousel_speed ? sectionDatum.carousel_speed : 0,
        floating_image_right: sectionDatum.floating_image_right || '',
        floating_image_left: sectionDatum.floating_image_left || '',
        hide: sectionDatum.hide || 0
    };
};

export const mapSectionDatumToStorySectionFormFields = (sectionDatum: any): StorySectionFormFields => {
    return {
        content: {
            en: sectionDatum.content?.en || '',
            ar: sectionDatum.content?.ar || '',
            fr: sectionDatum.content?.fr || '',
        },
        description: {
            en: sectionDatum.description?.en || '',
            ar: sectionDatum.description?.ar || '',
            fr: sectionDatum.description?.fr || '',
        },
        title: {
            en: sectionDatum.title?.en || '',
            ar: sectionDatum.title?.ar || '',
            fr: sectionDatum.title?.fr || '',
        },
        subtitle: {
            en: sectionDatum.subtitle?.en || '',
            ar: sectionDatum.subtitle?.ar || '',
            fr: sectionDatum.subtitle?.fr || '',
        },
        cta_text: {
            en: sectionDatum.cta_text?.en || '',
            ar: sectionDatum.cta_text?.ar || '',
            fr: sectionDatum.cta_text?.fr || '',
        },
        cta_link: {
            en: sectionDatum.cta_link?.en || '',
            ar: sectionDatum.cta_link?.ar || '',
            fr: sectionDatum.cta_link?.fr || '',
        },
        background_color: sectionDatum.background_color || '',
        carousel_speed: sectionDatum.carousel_speed ? Number(sectionDatum.carousel_speed) : 0,
        floating_image_right: sectionDatum.floating_image_right || '',
        floating_image_left: sectionDatum.floating_image_left || '',
        hide: sectionDatum.hide || 0
    };
};
