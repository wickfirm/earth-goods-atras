import {useContext} from 'react'
import {QueryRequestContext} from "./QueryRequestProvider.tsx";

const useQueryRequest = () => useContext(QueryRequestContext)

export {useQueryRequest}
