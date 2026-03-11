import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import React from "react";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";

const GuestCustomersColumns: ReadonlyArray<Column<any>> = [
    // {
    //     Header: (props) => <CustomHeader tableProps={props} title='Account ID' className='min-w-125px'/>,
    //     id: 'account_id',
    //     Cell: ({...props}) => <>
    //         <TextCell
    //             text={props.data[props.row.index].account_id}/>
    //     </>,
    // },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Customer' className='min-w-125px'/>,
        id: 'customer',
        Cell: ({...props}) => <>
            <TextCell
                text={props.data[props.row.index].name ?? 'N/A'}/>
           <small>{props.data[props.row.index].email ?? 'N/A'}</small>
        </>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Number of Orders' className='min-w-125px'/>,
        id: 'order_count',
        Cell: ({...props}) => <>
            <TextCell
                text={props.data[props.row.index].order_count}/>
        </>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-commerce'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to='manage-commerce'>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'commerce/customers/guest'}
                    queryKey={QUERIES.CUSTOMERS_LIST}
                    showView={true}
                    showEdit={false}
                    title="Delete Customer"
                    text={`Are you sure you want to delete the customer '${props.data[props.row.index].name}'?`}
                />
            </Restricted>

        ),
    },
]

export {GuestCustomersColumns}
