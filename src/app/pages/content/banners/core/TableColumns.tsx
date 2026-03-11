import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import React from "react";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {ThumbnailCell} from "../../../../modules/table/columns/ThumbnailCell.tsx";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../helpers/settings.ts";
import {BadgeCell} from "../../../../modules/table/columns/BadgeCell.tsx";

const BannersColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name.en}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Page' className='min-w-125px'/>,
        id: 'page',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].page.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Status' className='min-w-125px'/>,
        id: 'status',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].status ? 'Active' : 'Inactive'} color={props.data[props.row.index].status ? 'success' : 'dark'} align="left"/>,
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
                path={'content/banners'}
                queryKey={QUERIES.CONTENT_PROMOTIONAL_BANNERS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Banner"
                text={`Are you sure you want to delete the banner '${props.data[props.row.index].name.en}'?`}
            />
            // </Restricted>
        ),
    },
]

export {BannersColumns}
