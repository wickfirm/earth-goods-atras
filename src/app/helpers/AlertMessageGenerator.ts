import {Actions, WickToastType} from './variables'
import {GenericErrorMessage} from './form'

type AlertFunctionType = {
    [key: string]: (module: string) => string
}

const ActionTexts: { [key in Actions]: string } = {
    [Actions.CREATE]: 'create',
    [Actions.EDIT]: 'edit',
    [Actions.COPY]: 'copy',
    [Actions.SHOW]: 'show',
    [Actions.FILTER]: 'filter',
    [Actions.EXPORT]: 'export',
    [Actions.SELECT]: 'select',
    [Actions.OPTION]: 'option',
    [Actions.PAUSE]: 'pause',
    [Actions.CANCEL]: 'cancel',
    [Actions.RESUME]: 'resume',
    [Actions.DATE_RANGE_PICKER]: 'date-range-picker',
    [Actions.TABS]: 'card-tabs',
    [Actions.REORDER]: 'reorder',
}

export class AlertMessageGenerator {
    module: string
    action: number
    type: string
    message: string

    constructor(module: string, action: number, type: WickToastType) {
        this.module = module
        this.action = action
        this.type = type

        this.message = messages[(ActionTexts as any)[this.action]][this.type](this.module)
    }
}

export const messages: { [alert: string]: AlertFunctionType } = {
    create: {
        success: (module) => {
            return `Success! The ${module} was created.`
        },
        error: () => {
            return GenericErrorMessage
        },
    },
    copy: {
        success: (module) => {
            return `Success! The ${module} was copied.`
        },
        error: () => {
            return GenericErrorMessage
        },
    },
    edit: {
        success: (module) => {
            return `Success! The ${module} was updated.`
        },
        error: () => {
            return GenericErrorMessage
        },
    },
    export: {
        success: () => {
            return 'Success! Your exported file is ready to download.'
        },
        pending: () => {
            return "Attention! The report will be sent to your email once it's ready."
        },
        error: () => {
            return GenericErrorMessage
        },
    },
    reorder: {
        success: (module) => {
            return `Success! The ${module} was reordered.`
        },
        error: () => {
            return GenericErrorMessage
        },
    },
}
