import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {formatDateToMonthDayYear} from "../../../../helpers/dateFormatter.ts";

const DiscountCodesColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Code' className='min-w-125px'/>,
        id: 'code',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].code}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Type' className='min-w-125px'/>,
        id: 'type',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].type.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Value' className='min-w-125px'/>,
        id: 'value',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].value}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Expires At' className='min-w-125px'/>,
        id: 'expiration_date',
        Cell: ({...props}) => <TextCell text={formatDateToMonthDayYear(props.data[props.row.index].expiration_date)}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Redemptions' className='min-w-125px'/>,
        id: 'redemptions',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].redemptions}/>,
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
                    path={'commerce/discount-codes'}
                    queryKey={QUERIES.DISCOUNT_CODES_LIST}
                    showView={false}
                    showEdit={false}
                    title="Delete Discount Code"
                    text={`Are you sure you want to delete the discount code '${props.data[props.row.index].code}'?`}
                />
            </Restricted>
        ),
    },
]

export {DiscountCodesColumns}
