import {Column} from 'react-table'
import {initialQueryState, QUERIES, stringifyRequestQuery} from '../../../../../_metronic/helpers'
import {ActionsCell} from '../../../../modules/table/columns/ActionsCell'
import {CustomHeader} from '../../../../modules/table/columns/CustomHeader'
import {TextCell} from "../../../../modules/table/columns/TextCell.tsx";
import {Restricted} from "../../../../modules/auth/AuthAccessControl.tsx";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {BadgeCell} from "../../../../modules/table/columns/BadgeCell.tsx";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Subscription} from "../../../../models/engagement/Subscription.ts";
import {useQueryClient} from "react-query";
import {useQueryRequest} from "../../../../modules/table/QueryRequestProvider.loader.ts";
import Swal from "sweetalert2";
import {updateSubscription} from "../../../../requests/engagement/Subscription.ts";
import axios from "axios";
import {extractErrors} from "../../../../helpers/requests.ts";
import {Button} from "react-bootstrap";
import {Review} from "../../../../models/engagement/Review.ts";
import {updateReview} from "../../../../requests/engagement/Review.ts";
import {useQueryResponse} from "../../../../modules/table/QueryResponseProvider.loader.ts";

const ReviewsColumns: ReadonlyArray<Column<any>> = [
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
        Header: (props) => <CustomHeader tableProps={props} title='Review' className='min-w-125px'/>,
        id: 'review',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].review}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Rating' className='min-w-125px'/>,
        id: 'rating',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].rating}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='User' className='min-w-125px'/>,
        id: 'user',
        Cell: ({...props}) => <TextCell text={props.data[props.row.index].user?.name}/>,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Is Valid?' className='min-w-125px'/>,
        id: 'is_valid',
        Cell: ({...props}) => <BadgeCell status={props.data[props.row.index].is_valid ? 'Yes' : 'No'}
                                         color={props.data[props.row.index].is_valid ? 'success' : 'danger'}
                                         align="left"
        />,
    },
    {
        Header: (props) => <CustomHeader tableProps={props} title='Product' className='min-w-125px'/>,
        id: 'product',
        Cell: ({...props}) => <Link to={`/commerce/products/${props.data[props.row.index]?.product?.id}/edit`}><TextCell
            text={props.data[props.row.index]?.product?.name[DEFAULT_LANGUAGE]}/></Link>,
    },
    {
        Header: (props) => (
            <Restricted to='manage-engagement'>
                <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
            </Restricted>
        ),
        id: 'actions',
        Cell: ({...props}) => {
            const [review, setReview] = useState<Review>(props.data[props.row.index]);
            const queryClient = useQueryClient();
            const {state} = useQueryRequest();
            const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
            const {refetch} = useQueryResponse();

            useEffect(() => {
                setQuery(stringifyRequestQuery(state));
            }, [state]);

            const approve = async () => {
                const {isConfirmed} = await Swal.fire({
                    title: 'Approve',
                    text: 'Are you sure you want to approve this review?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm Approve',
                    confirmButtonColor: "#DB4437",
                    cancelButtonText: 'Dismiss',
                    reverseButtons: true
                })

                if (isConfirmed) {
                    updateReview(review.id, {
                        ...review,
                        ["is_valid"]: 1,
                    })
                        .then(() => {
                            refetch()
                            queryClient.invalidateQueries(`${QUERIES.ENGAGEMENT_SUBSCRIPTIONS_LIST}-${query}`)
                            setReview({
                                ...review,
                                ["is_valid"]: 1,
                            })
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

            const disapprove = async () => {
                const {isConfirmed} = await Swal.fire({
                    title: 'Disapprove',
                    text: 'Are you sure you want to disapprove this review?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm Disapprove',
                    confirmButtonColor: "#DB4437",
                    cancelButtonText: 'Dismiss',
                    reverseButtons: true
                })

                if (isConfirmed) {
                    updateReview(review.id, {
                        ...review,
                        ["is_valid"]: 0,
                    })
                        .then(() => {
                            refetch()
                            queryClient.invalidateQueries(`${QUERIES.ENGAGEMENT_SUBSCRIPTIONS_LIST}-${query}`)
                            setReview({
                                ...review,
                                ["is_valid"]: 0,
                            })
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
                    {
                        review.is_valid ?
                            <Button type="button" className='btn-sm btn-light-danger' variant='active-danger'
                                    onClick={disapprove}
                            >
                                Disapprove
                            </Button>
                            :
                            <Button type="button" className='btn-sm btn-light-success' variant='active-success'
                                    onClick={approve}
                            >
                                Approve
                            </Button>
                    }
                </Restricted>
            )
        }
    },
]

export {ReviewsColumns}
