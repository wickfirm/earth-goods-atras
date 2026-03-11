import React from 'react'
import {Column, useTable} from 'react-table'

export type TableLayout = 'layout-1' | 'layout-2'

type Props = {
    data: any[],
    columnsArray: readonly Column<any>[]
}

const WickTableWithData: React.FC<Props> = ({data, columnsArray}) => {
    const columns = React.useMemo(() => columnsArray, [])
    const tableInstance = useTable({columns, data})

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div className='table-responsive rounded w-100'>
            <table {...getTableProps()} className="align-middle fs-6 no-footer w-100">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr className="text-start text-muted fw-bolder fs-8 text-uppercase bg-light" {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <React.Fragment key={column.id}>
                                {column.render('Header')}
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className='text-gray-600' {...getTableBodyProps()}>
                {
                    rows.length > 0 ? (
                            <>
                                {
                                    rows.map(row => {
                                        prepareRow(row)
                                        return (
                                            <tr className="py-4" {...row.getRowProps()} key={row.id}>
                                                {row.cells.map(cell => (
                                                    <td  {...cell.getCellProps()} className="p-4">
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        )
                                    })
                                }
                            </>
                        )
                        :
                        (
                            <>
                                {
                                    <tr>
                                        <td colSpan={7}>
                                            <div
                                                className='d-flex text-center w-100 align-content-center justify-content-center py-4'>
                                                No matching records found
                                            </div>
                                        </td>
                                    </tr>
                                }
                            </>
                        )
                }
                </tbody>
            </table>
        </div>
    )
}

export default WickTableWithData
