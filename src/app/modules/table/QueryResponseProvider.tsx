import React, {FC, useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {useQueryRequest} from './QueryRequestProvider.loader.ts'
import {createResponseContext, initialQueryResponse, stringifyRequestQuery,} from '../../../_metronic/helpers'

type Props = {
    id: string
    requestFunction: any
    requestId?: number | string
}

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const QueryResponseProvider: FC<React.PropsWithChildren<Props>> = ({
                                                                       id,
                                                                       requestFunction,
                                                                       requestId,
                                                                       children,
                                                                   }) => {
    const {state} = useQueryRequest()

    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [query, updatedQuery])

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        `${id}-${query}`,
        () => {
            if (requestId) {
                return requestFunction(requestId, query)
            } else {
                return requestFunction(query)
            }
        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false, enabled: true}
    )

    return (
        <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </QueryResponseContext.Provider>
    )
}

export {
    QueryResponseProvider, QueryResponseContext
}
