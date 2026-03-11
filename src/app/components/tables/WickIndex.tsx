import React, {Dispatch, useMemo} from 'react'
import {Column} from 'react-table'

import {KTCard, KTCardBody} from '../../../_metronic/helpers'

import {QueryRequestProvider} from '../../modules/table/QueryRequestProvider'
import {QueryResponseProvider} from '../../modules/table/QueryResponseProvider'
import {useQueryResponseData, useQueryResponseLoading,} from '../../modules/table/QueryResponseProvider.loader.ts'
import {ListViewProvider} from '../../modules/table/ListViewProvider'
import {KTCardHeader, KTCardHeaderProps} from "../../../_metronic/helpers/components/KTCardHeader.tsx";
import WickTable, {TableLayout} from "./WickTable.tsx";

type Props = {
    queryId: string
    requestFunction: (query?: string) => Promise<any>
    columnsArray: readonly Column<any>[]
    cardHeader: KTCardHeaderProps
    showFilter: boolean
    setExportQuery: Dispatch<React.SetStateAction<string>>
    FilterComponent: React.FC<{
        showFilter: boolean
        setExportQuery: Dispatch<React.SetStateAction<string>>
    }>
    ktCardClasses?: string
    ktCardHeaderClasses?: string
    ktCardHeaderHasSearch?: boolean
    tableLayout?: TableLayout
}

type TableProps = {
    columnsArray: readonly Column<any>[]
    tableLayout?: TableLayout
}

const WickIndex: React.FC<Props> = ({
                                        queryId,
                                        requestFunction,
                                        columnsArray,
                                        cardHeader,
                                        showFilter,
                                        setExportQuery,
                                        FilterComponent,
                                        ktCardClasses,
                                        ktCardHeaderClasses,
                                        ktCardHeaderHasSearch,
                                        tableLayout
                                    }) => {
    return (
        <QueryRequestProvider>
            <QueryResponseProvider id={queryId} requestFunction={requestFunction}>
                <ListViewProvider>
                    <KTCard className={ktCardClasses}>
                        <KTCardHeader className={ktCardHeaderClasses} text={cardHeader.text}
                                      actions={cardHeader.actions}
                                      hasSearch={ktCardHeaderHasSearch}/>

                        <KTCardBody>
                            <FilterComponent showFilter={showFilter} setExportQuery={setExportQuery}/>
                            <IndexTable columnsArray={columnsArray} tableLayout={tableLayout}/>
                        </KTCardBody>
                    </KTCard>
                </ListViewProvider>
            </QueryResponseProvider>
        </QueryRequestProvider>
    )
}

const IndexTable = ({columnsArray, tableLayout}: TableProps) => {
    const modelData = useQueryResponseData()
    const isLoading = useQueryResponseLoading()
    const data = useMemo(() => modelData, [modelData])
    const columns = useMemo(
        () => columnsArray,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    return (
        <WickTable
            data={data}
            columns={columns}
            model={modelData.length > 0 ? modelData[0] : null}
            isLoading={isLoading}
            tableLayout={tableLayout ?? 'layout-2'}
        />
    )
}

export default WickIndex
