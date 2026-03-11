import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {IngredientInfoCell} from "../../../../modules/table/columns/IngredientInfoCell.tsx";

const IngredientsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <IngredientInfoCell ingredient={props.data[props.row.index]}/>,
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
                    path={'commerce/ingredients'}
                    queryKey={QUERIES.INGREDIENTS_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Ingredient"
                    text={`Are you sure you want to delete the ingredient '${props.data[props.row.index].name.en}'?`}
                />
            </Restricted>
        ),
    },
]

export {IngredientsColumns}
