import {Column} from 'react-table'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {formatDateToMonthDayYear} from "../../../../helpers/dateFormatter.ts";
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {extractErrors} from "../../../../helpers/requests.ts";
import {updateSubscription} from "../../../../requests/engagement/Subscription.ts";
import {Subscription} from "../../../../models/engagement/Subscription.ts";
import Swal from "sweetalert2";
import axios from "axios";
import {useQueryClient} from "react-query";
import {useQueryRequest} from "../../../../modules/table/QueryRequestProvider.loader.ts";
import {QUERIES, stringifyRequestQuery} from "../../../../../_metronic/helpers";
import {BadgeCell} from "../../../../modules/table/columns/BadgeCell.tsx";

const SubscriptionsColumns: ReadonlyArray<Column<any>> = [
    {
        Header: (props) => <CustomHeader tableProps={props} title='Type' className='min-w-125px'/>,
        id: 'type',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].type_label} color="twfirm" align="left"/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Email' className='min-w-125px'/>,
        id: 'email',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].email}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Subscribed at' className='min-w-125px'/>,
        id: 'subscribed_at',
        Cell: ({...props}) => <TextCell text={formatDateToMonthDayYear(props.data[props.row.index].created_at)}/>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-engagement'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const [subscription, setSubscription] = useState<Subscription>(props.data[props.row.index])
            const queryClient = useQueryClient();
            const {state} = useQueryRequest();
            const [query, setQuery] = useState<string>(stringifyRequestQuery(state));


            useEffect(() => {
                setQuery(stringifyRequestQuery(state));
            }, [state]);

            const unsubscribe = async () => {
                setSubscription({
                    ...subscription,
                    ["unsubscribed"]: 1,
                })

                const {isConfirmed} = await Swal.fire({
                    title: 'Unsubscribe',
                    text: 'Are you sure you want to unsubscribe this subscription?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm Unsubscribe',
                    confirmButtonColor: "#DB4437",
                    cancelButtonText: 'Dismiss',
                    reverseButtons: true
                })

                if (isConfirmed) {
                    updateSubscription(subscription.id, {
                        ...subscription,
                        ["unsubscribed"]: 1,
                    })
                        .then(() => {
                            queryClient.invalidateQueries(`${QUERIES.ENGAGEMENT_SUBSCRIPTIONS_LIST}-${query}`)
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
                <Restricted to='manage-engagement'>
                    <Button type="button" className='btn-sm btn-light-danger' variant='active-danger'
                            onClick={unsubscribe}
                    >
                        Unsubscribe
                    </Button>
                </Restricted>
            )
        }
    },
]

export {SubscriptionsColumns}
