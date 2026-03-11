import {Column} from 'react-table'
import {QUERIES, stringifyRequestQuery} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import React, {useEffect, useState} from "react";
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {formatDateToMonthDayYear} from "../../../../helpers/dateFormatter.ts";
import {BadgeCell} from "../../../../modules/table/columns/BadgeCell.tsx";
import {capitalizeFirstLetter} from "../../../../helpers/stringGenerator.ts";
import {Subscription} from "../../../../models/engagement/Subscription.ts";
import {useQueryClient} from "react-query";
import {useQueryRequest} from "../../../../modules/table/QueryRequestProvider.loader.ts";
import Swal from "sweetalert2";
import axios from "axios";
import {extractErrors} from "../../../../helpers/requests.ts";
import {Button, OverlayTrigger, Tooltip} from "react-bootstrap";
import {refundOrder} from "../../../../requests/commerce/Order.ts";
import {useAuth} from "../../../../modules/auth";
import {RoleEnum} from "../../../../enum/RoleEnum.ts";

const OrdersColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Order ID' className='min-w-125px'/>,
        id: 'order_number',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].order_number}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='IQ Client Reference' className='min-w-125px'/>,
        id: 'iq_client_reference',
        Cell: ({...props}) => <>
            {
                props.data[props.row.index].iq_client_reference ?
                    <BadgeCell status={props.data[props.row.index].iq_client_reference} color="success" align="left"/>
                    :
                    <BadgeCell status="Order not sent to IQ" color="warning" align="left"/>
            }
        </>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Customer' className='min-w-125px'/>,
        id: 'customer',
        Cell: ({...props}) => <>
            <TextCell
                text={props.data[props.row.index].customer?.name ?? 'N/A'}/>
            {props.data[props.row.index].customer && <small>{props.data[props.row.index].customer?.email}</small>}
        </>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Status' className='min-w-125px'/>,
        id: 'status',
        Cell: ({...props}) => <>
            <BadgeCell status={capitalizeFirstLetter(props.data[props.row.index].status)} color={
                capitalizeFirstLetter(props.data[props.row.index].status) === 'Paid' ?
                    'info' :
                    capitalizeFirstLetter(props.data[props.row.index].status) === 'Refunded' ? 'danger' : capitalizeFirstLetter(props.data[props.row.index].status) === 'Delivered' ? 'success' : 'primary'} align="left"/>

            {
                capitalizeFirstLetter(props.data[props.row.index].status) === 'Cancelled' ||
                capitalizeFirstLetter(props.data[props.row.index].status) === 'Open'?
                    <small>The user reached Stripe checkout but didn’t complete payment</small>
                    :
                    <></>
            }
            </>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Payment Status' className='min-w-125px'/>,
        id: 'payment_status',
        Cell: ({...props}) => <BadgeCell status={capitalizeFirstLetter(props.data[props.row.index].paymentRequest.paymentResponse.payment_status)} color={capitalizeFirstLetter(props.data[props.row.index].paymentRequest.paymentResponse.payment_status) === 'Paid' ? 'info' : capitalizeFirstLetter(props.data[props.row.index].paymentRequest.paymentResponse.payment_status) === 'Refunded' ? 'danger' : 'warning'} align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Total' className='min-w-125px'/>,
        id: 'total',
        Cell: ({...props}) => <TextCell text={`${props.data[props.row.index].total_price} AED`}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Date Added' className='min-w-125px'/>,
        id: 'date_added',
        Cell: ({...props}) => <TextCell text={`${formatDateToMonthDayYear(props.data[props.row.index].created_at)}`}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-commerce'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const [order, setOrder] = useState<Subscription>(props.data[props.row.index])
            const queryClient = useQueryClient();
            const {state} = useQueryRequest();
            const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
            const {currentUser, hasRoles} = useAuth();

            useEffect(() => {
                setQuery(stringifyRequestQuery(state));
            }, [state]);

            const refund = async () => {
                const {isConfirmed} = await Swal.fire({
                    title: 'Refund',
                    text: 'Are you sure you want to refund this order?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm Refund',
                    confirmButtonColor: "#DB4437",
                    cancelButtonText: 'Dismiss',
                    reverseButtons: true
                })

                if (isConfirmed) {
                    refundOrder(order.id)
                        .then(() => {
                            queryClient.invalidateQueries(`${QUERIES.ORDERS_LIST}-${query}`)
                        }).catch((error) => {

                        if (axios.isAxiosError(error)) {
                            const errorMessages = extractErrors(error).map((errorMessage) => `<li>${errorMessage}</li>`)

                            // we need to show the error
                            Swal.fire(
                                'Something Wrong Happened',
                                "<p>" + errorMessages.join() + "</p>",
                                "error"
                            );
                        } else if (error === undefined) {
                            // we need to show a generic error
                            Swal.fire(
                                'Something Wrong Happened',
                                "<p>Could not complete your request. Please try again later.</p>",
                                "error"
                            );
                        }
                    }).finally(() => {

                    });
                }
            }

            return (
                <Restricted to='manage-commerce'>
                    {
                        !hasRoles(currentUser, [RoleEnum.EDITOR]) && (
                            <Button type="button" className='btn-sm btn-light-danger' variant='active-danger'
                                    onClick={refund}
                            >
                                Refund
                            </Button>
                        )
                    }

                    <ActionsCell
                        id={props.data[props.row.index].id}
                        path={'commerce/orders'}
                        queryKey={QUERIES.ORDERS_LIST}
                        showView={true}
                        showEdit={false}
                        title="Delete Order"
                        text={`Are you sure you want to delete the order '${props.data[props.row.index].name}'?`}
                    />
                </Restricted>
            )
        }
    },
]

export {OrdersColumns}
