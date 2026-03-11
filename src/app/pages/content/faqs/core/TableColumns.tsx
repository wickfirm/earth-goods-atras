import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import React from "react";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {BadgeCell} from "../../../../modules/table/columns/BadgeCell.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";

const FaqsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Question' className='min-w-125px'/>,
        id: 'question',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].question[DEFAULT_LANGUAGE]}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Answer' className='min-w-125px'/>,
        id: 'answer',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].answer[DEFAULT_LANGUAGE]}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Is Active?' className='min-w-125px'/>,
        id: 'is_active',
        Cell: ({...props}) => <BadgeCell align="left"
                                         status={props.data[props.row.index].is_active ? 'Active' : 'Inactive'}
                                         color={props.data[props.row.index].is_active ? 'success' : 'light'}/>,
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
                path={'content/faqs'}
                queryKey={QUERIES.CONTENT_FAQS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Faq"
                text={`Are you sure you want to delete the faq '${props.data[props.row.index].question[DEFAULT_LANGUAGE]}'?`}
            />
            // </Restricted>
        ),
    },
]

export {FaqsColumns}
