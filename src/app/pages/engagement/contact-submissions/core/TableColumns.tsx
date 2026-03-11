import {Column} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {formatDateToMonthDayYear} from "../../../../helpers/dateFormatter.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {BadgeCell} from "../../../../modules/table/columns/BadgeCell.tsx";

const ContactSubmissionsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Type' className='min-w-125px'/>,
        id: 'type',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].type.name} color="twfirm" align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Email' className='min-w-125px'/>,
        id: 'email',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].email}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Message' className='min-w-125px'/>,
        id: 'message',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].message}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Subject' className='min-w-125px'/>,
        id: 'subject',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].subject?.name[DEFAULT_LANGUAGE]} color="info" align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Submitted at' className='min-w-125px'/>,
        id: 'submitted_at',
        Cell: ({...props}) => <TextCell text={formatDateToMonthDayYear(props.data[props.row.index].created_at)}/>,
    },
]

export {ContactSubmissionsColumns}
