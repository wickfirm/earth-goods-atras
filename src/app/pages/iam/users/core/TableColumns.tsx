import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {useAccessControl} from "../../../../modules/auth/AuthAccessControl.loader.ts";
import {truncateText} from "../../../../helpers/stringGenerator.ts";
import {UserInfoCell} from "../../../../modules/table/columns/UserInfoCell.tsx";
import {Role} from "../../../../models/iam/Role.ts";

const UsersColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Profile' className='min-w-125px'/>,
        id: 'profile',
        Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Roles' className='min-w-125px'/>,
        id: 'roles',
        Cell: ({...props}) => <TextCell
            text={truncateText(props.data[props.row.index].roles.map((role: Role) => role.name).join(", "))}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-iam'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const accessControl = useAccessControl();

            return (<ActionsCell
                id={props.data[props.row.index].id}
                path={'iam/users'}
                queryKey={QUERIES.USERS_LIST}
                showView={true}
                showEdit={accessControl.userCan('manage-iam')}
                showDelete={accessControl.userCan('manage-iam')}
                showImpersonate={accessControl.userCan('impersonate-user')}
                title="Delete User"
                text={`Are you sure you want to delete the user '${props.data[props.row.index].name}'?`}
            />)
        },
    },
]

export {UsersColumns}
