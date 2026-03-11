import {useContext} from 'react'
import {MainContext} from "./MainContext.tsx";

const useMain = () => {
    return useContext(MainContext)
}

export {useMain}