import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import React from "react";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {ThumbnailCell} from "../../../../modules/table/columns/ThumbnailCell.tsx";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../helpers/settings.ts";

const BlogsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Thumbnail' className='min-w-50px'/>,
        id: 'thumbnail',
        Cell: ({...props}) => <ThumbnailCell
            src={props.data[props.row.index].featured_image[DEFAULT_RESPONSIVE_IMAGE_SIZE]}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Title' className='min-w-125px'/>,
        id: 'title',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].title.en}/>,
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
                path={'content/blogs'}
                queryKey={QUERIES.CONTENT_BLOGS_LIST}
                showView={false}
                showEdit={true}
                title="Delete Blog"
                text={`Are you sure you want to delete the blog '${props.data[props.row.index].title.en}'?`}
            />
            // </Restricted>
        ),
    },
]

export {BlogsColumns}
