import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import React from "react";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {CustomerReviewInfoCell} from "../../../../modules/table/columns/CustomerReviewInfoCell.tsx";

const CustomerReviewsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <CustomerReviewInfoCell customerReview={props.data[props.row.index]}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Rating' className='min-w-125px'/>,
        id: 'rating',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].rating}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Review' className='min-w-125px'/>,
        id: 'review',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].review[DEFAULT_LANGUAGE]}/>,
    },
    {
        Header: (props) => (
            // <Restricted to='manage-content'>
            <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            // </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            // <Restricted to='manage-content'>
            <ActionsCell
                id={props.data[props.row.index].id}
                path={'content/customer-reviews'}
                queryKey={QUERIES.CONTENT_CUSTOMER_REVIEWS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Customer Review"
                text={`Are you sure you want to delete the customer review '${props.data[props.row.index].name[DEFAULT_LANGUAGE]}'?`}
            />
            // </Restricted>
        ),
    },
]

export {CustomerReviewsColumns}
