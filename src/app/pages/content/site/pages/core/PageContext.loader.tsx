import {useContext} from 'react'
import {PageContext} from "./PageContext.tsx";

const usePage = () => {
    return useContext(PageContext)
}

export {usePage}