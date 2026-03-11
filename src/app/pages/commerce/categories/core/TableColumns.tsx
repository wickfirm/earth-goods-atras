import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {CategoryInfoCell} from "../../../../modules/table/columns/CategoryInfoCell.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";

const CategoriesColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Category' className='min-w-125px'/>,
        id: 'thumbnail',
        Cell: ({...props}) => <CategoryInfoCell category={props.data[props.row.index]}/>,
    },
    // {
    //     Header: (props) => <CustomHeader tableProps={props} title='Parent' className='min-w-125px'/>,
    //     id: 'parent',
    //     Cell: ({...props}) => <TextCell text={props.data[props.row.index].parent?.name}/>,
    // },
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
                    path={'commerce/categories'}
                    queryKey={QUERIES.CATEGORIES_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Category"
                    text={`Are you sure you want to delete the category '${props.data[props.row.index].name[DEFAULT_LANGUAGE]}'?`}
                />
            </Restricted>
        ),
    },
]

export {CategoriesColumns}
