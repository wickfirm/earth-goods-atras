import {createContext, Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Options} from "../../models/Options.ts";
import {DEFAULT_OPTIONS} from "../../helpers/settings.ts";
import {getOptions} from "../../requests/Options.ts";
import {WithChildren} from "../../../_metronic/helpers";
import {getErrorPage, submitRequest} from "../../helpers/requests.ts";

interface Props {
    options: Options
    setOptions: Dispatch<SetStateAction<Options>>
}

const defaultMainContext = {
    options: DEFAULT_OPTIONS,
    setOptions: () => {
    },
}

export const MainContext = createContext<Props>(defaultMainContext)

export const MainProvider: FC<WithChildren> = ({children}) => {
    const navigate = useNavigate()

    const [options, setOptions] = useState<Options>(DEFAULT_OPTIONS)

    useEffect(() => {
        // get the list of all options
        submitRequest(getOptions, [], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setOptions(response)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MainContext.Provider
            value={{
                options,
                setOptions
            }}
        >
            {children}
        </MainContext.Provider>
    )
}
