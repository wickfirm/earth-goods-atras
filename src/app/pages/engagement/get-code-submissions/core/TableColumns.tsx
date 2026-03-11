import {Column} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {formatDateToMonthDayYear} from "../../../../helpers/dateFormatter.ts";

const GetCodeSubmissionsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Email' className='min-w-125px'/>,
        id: 'email',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].email}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Subscribed at' className='min-w-125px'/>,
        id: 'created_at',
        Cell: ({...props}) => <TextCell text={formatDateToMonthDayYear(props.data[props.row.index].created_at)}/>,
    },
]

export {GetCodeSubmissionsColumns}
