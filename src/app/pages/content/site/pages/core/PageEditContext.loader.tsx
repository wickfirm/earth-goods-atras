import {useContext} from 'react'
import {PageEditContext} from "./PageEditContext.tsx";

const usePageEdit = () => {
    return useContext(PageEditContext)
}

export {usePageEdit}