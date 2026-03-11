import {useContext} from 'react'
import {AccessControlContext} from "./AuthAccessControl.tsx";

const useAccessControl = () => {
    return useContext(AccessControlContext)
}

export {useAccessControl}
