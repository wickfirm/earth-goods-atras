import {createContext, FC} from 'react'
import {WithChildren} from "../../../../../../_metronic/helpers";

interface Props {

}

const defaultPageContext = {}

export const PageContext = createContext<Props>(defaultPageContext)

export const PageProvider: FC<WithChildren> = ({children}) => {
    return (
        <PageContext.Provider value={{}}>
            {children}
        </PageContext.Provider>
    )
}
