import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";

const HighlightsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Highlight' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name[DEFAULT_LANGUAGE]}/>,
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
                    path={'commerce/highlights'}
                    queryKey={QUERIES.HIGHLIGHT_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Highlight"
                    text={`Are you sure you want to delete the highlight '${props.data[props.row.index].name[DEFAULT_LANGUAGE]}'?`}
                />
            </Restricted>
        ),
    },
]

export {HighlightsColumns}
