import {useContext} from 'react'
import {WickContext} from "./WickApp.tsx";

const useWickApp = () => {
    return useContext(WickContext)
}

export {useWickApp}