import axios from 'axios'
import {useEffect, useState} from 'react'
import {AlertMessageGenerator} from './AlertMessageGenerator'
import {GenericErrorMessage} from './form'
import {exportObjects, extractErrors} from './requests'
import {Actions, WickToastType} from './variables'
import {LocalizedStrings} from "../models/LocalizedStrings.ts";

export const APP_URL = import.meta.env.VITE_APP_BACKEND_URL

export const storageUrl = (path: string) => {
    return APP_URL + path;
}

export const downloadOnClick = (href: string | null | undefined) => {
    if (href) {
        const link = document.createElement('a')

        link.href = href

        link.click()
    }
}

export const genericExportHandler = (wickApp: any, exportQuery: string, exportEndpoint: string) => {
    // we already have the query for our export request ready based on filters
    // we just need to do the api call
    exportObjects(exportEndpoint, exportQuery).then((response) => {
        if (axios.isAxiosError(response)) {
            // we need to show the errors
            wickApp.setAlert({message: extractErrors(response).join(' '), type: WickToastType.ERROR})
        } else if (response === undefined) {
            // show generic error message
            wickApp.setAlert({message: GenericErrorMessage, type: WickToastType.ERROR})
        } else {
            // we need to check the status of the response
            if (response.data.status === 'ready' && response.data.url !== undefined) {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('', Actions.EXPORT, WickToastType.SUCCESS).message,
                    type: WickToastType.SUCCESS,
                })

                const link = document.createElement('a')
                link.href = response.data.url

                link.click()
            } else if (response.data.status === 'pending') {
                wickApp.setAlert({
                    message: new AlertMessageGenerator('', Actions.EXPORT, WickToastType.PENDING).message,
                    type: WickToastType.PENDING,
                })
            }
        }
    })
}

export const copyToClipboard = (wickApp: any, text: string, module: string) => {
    // copy the text
    navigator.clipboard.writeText(text)

    // show user success message that it was copied
    wickApp.setAlert({
        message: new AlertMessageGenerator(module, Actions.COPY, WickToastType.SUCCESS).message,
        type: WickToastType.SUCCESS,
    })
}

export const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
}

export const useDebounce = (value: any, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value) //setDebouncedValue to value
        }, delay) //setTimeout to delay

        //will clear timeout if value changes
        //when we get to end of the delay and if val not changed we will set value
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export const bytesToMB = (bytes: number) => {
    const megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2); // Rounds to 2 decimal places
}

export const isValidLanguageKey = (key: string): key is keyof LocalizedStrings => {
    return ['en', 'ar', 'fr'].includes(key);
};
