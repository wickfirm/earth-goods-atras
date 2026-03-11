import React from 'react'
import {Table} from 'react-bootstrap'
import {Column, ColumnInstance, Row, useTable} from 'react-table'
import {CustomHeaderColumn} from "../../../modules/table/columns/CustomHeaderColumn.tsx";
import {CustomRow} from "../../../modules/table/columns/CustomRow.tsx";

type Props = {
    data: any[]
    columns: readonly Column<any>[]
    model: any
}

const WickTableLayout1: React.FC<Props> = ({data, columns, model}) => {
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,
        data,
    })

    return (
        <div>
            <div className='table-responsive border rounded'>
                <Table
                    className='align-middle table-row-bordered fs-6 gy-5 gs-7 dataTable table-striped no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<typeof model>) => (
                            <CustomHeaderColumn key={column.id} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<typeof model>, i) => {
                            prepareRow(row)
                            return <CustomRow row={row} key={`row-${i}-${row.id}`}/>
                        })
                    ) : (
                        <tr>
                            <td colSpan={columns.length}>
                                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                    No matching records found
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default WickTableLayout1
