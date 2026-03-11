import React, {useMemo} from 'react'
import {Column} from 'react-table'
import {QueryRequestProvider} from "../../modules/table/QueryRequestProvider.tsx";
import {QueryResponseProvider} from "../../modules/table/QueryResponseProvider.tsx";
import TableRefetch from "./TableRefetch.tsx";
import TableFilter from "./TableFilter.tsx";
import {ListViewProvider} from "../../modules/table/ListViewProvider.tsx";
import WickTableSearchFilter from "./WickTableSearchFilter.tsx";
import {useQueryResponseData, useQueryResponseLoading} from "../../modules/table/QueryResponseProvider.loader.ts";
import WickBorderlessTable from "./WickBorderlessTable.tsx";

type Props = {
    queryId: string
    requestFunction: (query?: string) => Promise<any>
    requestId?: string | number
    columnsArray: readonly Column<any>[]
    slug: string
    doRefetch: boolean
    showSearchFilter?: boolean
    filters?: any
}

type TableProps = {
    columnsArray: readonly Column<any>[]
}

const WickInnerTable: React.FC<Props> = ({
                                             queryId,
                                             requestFunction,
                                             requestId,
                                             columnsArray,
                                             slug,
                                             doRefetch,
                                             showSearchFilter = true,
                                             filters,
                                         }) => {
    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={queryId} requestFunction={requestFunction} requestId={requestId}>
                <TableRefetch doRefetch={doRefetch}/>

                <TableFilter filters={filters}/>

                <ListViewProvider>
                    {showSearchFilter ? <WickTableSearchFilter slug={slug} filters={filters}/> : <></>}

                    <InnerTable columnsArray={columnsArray}/>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const InnerTable = ({columnsArray}: TableProps) => {
    const modelData = useQueryResponseData()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => modelData, [modelData])
    const columns = useMemo(
        () => columnsArray,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <WickBorderlessTable
            data={data}
            columns={columns}
            model={modelData.length > 0 ? modelData[0] : null}
            isLoading={isLoading}
        />
    )
}

export default WickInnerTable
