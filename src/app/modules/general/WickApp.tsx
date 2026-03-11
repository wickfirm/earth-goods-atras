import {createContext, Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import toast, {Toaster, ToastOptions} from 'react-hot-toast';
import {WithChildren} from '../../../_metronic/helpers';
import {WickToastType} from "../../helpers/variables.ts";
import PendingIcon from "../../components/icons/PendingIcon.tsx";

type Alert = {
    message: string;
    type: WickToastType;
}

type WickContextProps = {
    alert: Alert | undefined
    setAlert: Dispatch<SetStateAction<Alert | undefined>>,
    pageTitle: string,
    setPageTitle: Dispatch<SetStateAction<string>>,
}

const initWickContextPropsState = {
    alert: undefined,
    setAlert: () => {
    },
    pageTitle: '',
    setPageTitle: () => {
    },
}

const WickContext = createContext<WickContextProps>(initWickContextPropsState)

// const useWickApp = () => {
//     return useContext(WickContext)
// }

const WickApp: FC<WithChildren> = ({children}) => {
    const [alert, setAlert] = useState<Alert | undefined>(undefined)
    const [pageTitle, setPageTitle] = useState<string>('')

    const color = {
        'success': '#50cd89',
        'error': '#f1416c',
        'pending': '#d5441c',
        'warning': '#FFA800'
    }

    const type = {
        'success': alert?.type,
        'error': alert?.type,
        'pending': 'success',
        'warning': alert?.type
    }

    const icon = {
        'pending': <PendingIcon/>,
        'warning': '⚠️',
    }

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);

    useEffect(() => {
        if (alert !== undefined) {
            const options: ToastOptions = {
                id: `alert-${alert.type}`,
                duration: 4000,
                position: 'top-center',
                style: {
                    border: '1px solid ' + (color as any)[alert.type],
                    padding: '16px',
                    color: '#000000',
                },
                iconTheme: {
                    primary: (color as any)[alert.type],
                    secondary: '',
                },
                ...(alert.type in icon ? {icon: (icon as any)[alert.type]} : {}),
            };

            if (['success', 'error', 'loading', 'blank', 'custom'].includes(alert.type)) {
                (toast as any)[(type as any)[(alert.type)]](alert.message, options)
            } else {
                (toast as any)(alert.message, options)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alert]);

    return (
        <WickContext.Provider value={{alert, setAlert, pageTitle, setPageTitle}}>
            {children}
            <Toaster/>
        </WickContext.Provider>
    )
}

export {WickApp, WickContext}