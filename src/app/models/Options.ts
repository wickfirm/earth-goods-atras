import {Response} from '../../_metronic/helpers'

export type Language = {
    id: string
    name: string
}

export type Gender = {
    id: string
    name: string
}

export type Page = {
    id: string
    name: string
}

export type CtaType = {
    id: string
    name: string
}

export type Options = {
    languages: Language[];
    genders: Gender[];
    pages: Page[];
    ctaTypes: CtaType[];
}

export type OptionsPaginate = Response<Options[]>
