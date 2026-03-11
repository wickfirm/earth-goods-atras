import React from 'react'
import {Column} from 'react-table'
import {TableListLoading} from '../../modules/table/TableListLoading'
import {TableListPagination} from '../../modules/table/TableListPagination'
import WickTableLayout1 from "./layout/Layout1.tsx";
import WickTableLayout2 from "./layout/Layout2.tsx";

export type TableLayout = 'layout-1' | 'layout-2'

type Props = {
    data: any[]
    columns: readonly Column<any>[]
    model: any
    isLoading: boolean,
    tableLayout: TableLayout
}

const WickTable: React.FC<Props> = ({data, columns, model, isLoading, tableLayout}) => {
    return (
        <div>
            {
                tableLayout === 'layout-1' ?
                    <WickTableLayout1 data={data} columns={columns} model={model}/>
                    :
                    <WickTableLayout2 data={data} columns={columns} model={model}/>
            }
            <TableListPagination/>
            {isLoading && <TableListLoading/>}
        </div>
    )
}

export default WickTable
