import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";

const CollectionsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name[DEFAULT_LANGUAGE]}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-misc'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => (
            <Restricted to='manage-misc'>
                <ActionsCell
                    id={props.data[props.row.index].id}
                    path={'misc/collections'}
                    queryKey={QUERIES.COLLECTIONS_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Collection"
                    text={`Are you sure you want to delete the collection '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {CollectionsColumns}
