import {Column} from 'react-table'
import {QUERIES} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from '../../../../modules/table/columns/TextCell'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import React from "react";
import {ProductInfoCell} from "../../../../modules/table/columns/ProductInfoCell.tsx";
import {formatNumber} from "../../../../helpers/dataManipulation.ts";
import {BadgeCell} from "../../../../modules/table/columns/BadgeCell.tsx";
import {ProductStatusEnum} from "../../../../enum/ProductStatusEnum.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";

const ProductsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Product' className='min-w-125px'/>,
        id: 'name',
        Cell: ({...props}) => <ProductInfoCell product={props.data[props.row.index]}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='SKU' className='min-w-125px'/>,
        id: 'sku',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].sku}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Quantity' className='min-w-125px'/>,
        id: 'available_qty',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].available_qty.toString()}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Price' className='min-w-125px'/>,
        id: 'price',
        Cell: ({...props}) => <TextCell
            text={`${formatNumber(props.data[props.row.index].price)} AED`}
        />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Product Status' className='min-w-125px'/>,
        id: 'status',
        Cell: ({...props}) => <BadgeCell align="left" status={props.data[props.row.index].status.name}
                                         color={props.data[props.row.index].status.id === ProductStatusEnum.IN_STOCK ? 'success' : props.data[props.row.index].status.id === ProductStatusEnum.OUT_STOCK ? 'danger' : 'warning'}/>,
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
                    path={'commerce/products'}
                    queryKey={QUERIES.PRODUCTS_LIST}
                    showView={false}
                    showEdit={true}
                    title="Delete Product"
                    text={`Are you sure you want to delete the product '${props.data[props.row.index].name[DEFAULT_LANGUAGE]}'?`}
                />
            </Restricted>
        ),
    },
]

export {ProductsColumns}
