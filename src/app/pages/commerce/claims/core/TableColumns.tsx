import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {ClaimInfoCell} from "../../../../modules/table/columns/ClaimInfoCell.tsx";

const ClaimsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Claim' className='min-w-125px'/>,
        id: 'thumbnail',
        Cell: ({...props}) => <ClaimInfoCell claim={props.data[props.row.index]}/>,
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
                    path={'commerce/claims'}
                    queryKey={QUERIES.CLAIMS_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Claim"
                    text={`Are you sure you want to delete the claim '${props.data[props.row.index].name}'?`}
                />
            </Restricted>
        ),
    },
]

export {ClaimsColumns}
