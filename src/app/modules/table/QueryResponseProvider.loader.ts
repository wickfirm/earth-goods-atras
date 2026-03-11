import {useContext} from 'react'
import {initialQueryState, PaginationState,} from '../../../_metronic/helpers'
import {QueryResponseContext} from "./QueryResponseProvider.tsx";

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
    const {response} = useQueryResponse()
    if (!response) {
        return []
    }

    return response?.data || []
}

const useQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useQueryResponse()
    if (!response || !response.meta) {
        return defaultPaginationState
    }

    return response.meta
}

const useQueryResponseLoading = (): boolean => {
    const {isLoading} = useQueryResponse()
    return isLoading
}

export {
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading,
}
