import React, {useEffect, useMemo, useState} from 'react'
import {Button, Nav, Tab} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import {IQOrder, Order, OrderHistory} from "../../../../models/commerce/Order.ts";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {exportComprehensiveReport, getOrder, getOrderIQDetails} from "../../../../requests/commerce/Order.ts";
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../../helpers/sections.ts";
import {PageTypes} from "../../../../helpers/variables.ts";
import {convertToGST, formatDateToDateTime, formatDateToMonthDayYear} from "../../../../helpers/dateFormatter.ts";
import {DEFAULT_LANGUAGE, DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../../helpers/settings.ts";
import {storageUrl} from "../../../../helpers/general.ts";
import {capitalizeFirstLetter} from "../../../../helpers/stringGenerator.ts";
import PayoutSummaryTable from "../partials/Payout/PayoutSummaryTable.tsx";
import clsx from "clsx";

// Lazy load sections to improve performance

// Memoize settingsNav to prevent re-rendering
const settingsNav = [
    {
        id: 1,
        title: "Order Summary",
        description: "View a summary of your current orders, including quantities, prices, and statuses.",
        icon: "fa fa-list-alt",
    },
    {
        id: 2,
        title: "Order History",
        description: "Access a detailed log of your past orders with dates and fulfillment statuses.",
        icon: "fa fa-history",
    },
    {
        id: 3,
        title: "Payouts",
        description: "View the paid payout",
        icon: "fa-solid fa-money-bill-transfer",
    },
];

type StatusEntry = {
    date: string;
    status: string;
};

const OrderShow = () => {
    const wickApp = useWickApp();
    const {id} = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState<Order | null>(null);
    const [iqOrder, setIQOrder] = useState<IQOrder | null>(null);
    const [trackingLink, setTrackingLink] = useState<string>("");
    const [shippingLabelUrl, setShippingLabelUrl] = useState<string>("");
    const [orderHistory, setOrderHistory] = useState<OrderHistory[] | null>(null);

    useEffect(() => {
        if (id) {
            submitRequest(getOrder, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setOrder(response);
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_ORDERS, PageTypes.SHOW, order?.order_number))
    }, [order, wickApp]);

    useEffect(() => {
        if (order) {
            submitRequest(getOrderIQDetails, [order?.iq_client_reference], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setIQOrder(response);
                    const data = response.data

                    const history: OrderHistory[] = []

                    const paymentResponse = order?.paymentRequest?.paymentResponse;
                    if (paymentResponse) {
                        history.push({
                            status: paymentResponse.payment_status,
                            date: convertToGST(paymentResponse.updated_at),
                            comment: "Stripe"
                        });
                    }


                    if (data) {
                        const statusHistory = data.status_history || [];
                        const sortedData = statusHistory.sort((a: any, b: any) => a.date.in_seconds - b.date.in_seconds);

                        sortedData.forEach((status: { status: string, date: { date: string }, comment: string }) => {
                            history.push({
                                status: status.status,
                                date: formatDateToDateTime(status.date.date),
                                comment: `IQ Fulfillment ${status.comment ? ' - ' + status.comment : ''}`
                            });
                        });

                        setTrackingLink(data.tracking_link)
                        setShippingLabelUrl(data.shipping_label_url)
                    }

                    setOrderHistory(history);
                }
            });
        }
        // submitRequest(getIQOrder, ['EGIQ00003'], (response) => {
        //     const errorPage = getErrorPage(response);
        //
        //     if (errorPage) {
        //         navigate(errorPage);
        //     } else {
        //         const history: OrderHistory[] = [];
        //
        //         const paymentResponse = order?.paymentRequest?.paymentResponse;
        //         if (paymentResponse) {
        //             history.push({
        //                 status: paymentResponse.payment_status,
        //                 date: formatDateToMonthDayYear(paymentResponse.updated_at),
        //                 comment: "Stripe"
        //             });
        //         }

        // if (response.length > 0) {
        //     const statusHistory = response[0]?.status_history || [];
        //     statusHistory.forEach((status: { status: string, date: { date: string }, comment: string }) => {
        //         history.push({
        //             status: status.status,
        //             date: formatDateToMonthDayYear(status.date.date),
        //             comment: "IQ Fulfillment"
        //         });
        //     });
        //
        //     setTrackingLink(response[0].tracking_link)
        //     setShippingLabelUrl(response[0].shipping_label_url)
        // }
        //
        // setOrderHistory(history);
        //     }
        // });
    }, [order]);

    const memoizedNavItems = useMemo(() => settingsNav, []);
    const handleComprehensiveExport = async () => {
        if (!order) {
            alert('No data available to export');
            return;
        }

        try {
            // Replace with your actual API base URL
            const response = await  exportComprehensiveReport(order.id);

            console.log(response)
            if (!response.status) {
                throw new Error('Export failed');
            }
            // //
            // // // Create blob and download
            const blob = response.data;
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `order-report-${order.id}-${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Comprehensive export failed:', error);
            alert('Failed to export comprehensive report. Please try again.');
        }
    };

    return (
        <>
            {
                order && (
                    <>
                        <div className="d-flex flex-column flex-xl-row gap-7 gap-lg-10 mb-10">
                            <div className="card card-flush py-4 flex-row-fluid">
                                <div className="card-header">
                                    <div className="card-title justify-content-between">
                                        <h2>Order Details (#{order?.order_number})</h2>


                                    </div>
                                    <div className={'card-toolbar'}>

                                        <Button type="button" className={clsx('btn btn-light-info fs-10', '')}
                                                title="Export"
                                                onClick={handleComprehensiveExport}>
                                            <i className={clsx('fa fs-6', 'fa-download', 'pe-0')}></i>
                                        </Button>

                                    </div>
                                </div>

                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table
                                            className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                                            <tbody className="fw-semibold text-gray-600">
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-calendar fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span></i> Date
                                                        Added
                                                    </div>
                                                </td>
                                                <td className="fw-bold text-end">{formatDateToMonthDayYear(order?.created_at)}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-wallet fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span><span
                                                            className="path3"></span><span
                                                            className="path4"></span></i> Payment
                                                        Method
                                                    </div>
                                                </td>
                                                <td className="fw-bold text-end">
                                                    {order.paymentRequest.payment_method_details}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-truck fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span><span
                                                            className="path3"></span><span
                                                            className="path4"></span><span
                                                            className="path5"></span></i> Shipping Method
                                                    </div>
                                                </td>
                                                <td className="fw-bold text-end">Flat Shipping Rate</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-flush py-4  flex-row-fluid">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Customer Details</h2>
                                    </div>
                                </div>

                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table
                                            className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                                            <tbody className="fw-semibold text-gray-600">
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-profile-circle fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span><span
                                                            className="path3"></span></i> Customer
                                                    </div>
                                                </td>

                                                <td className="fw-bold text-end">
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <a href="#"
                                                           className="text-gray-600 text-hover-primary">
                                                            {order.customer ? order.customer.name : 'Guest'}
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-sms fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span></i> Email
                                                    </div>
                                                </td>
                                                <td className="fw-bold text-end">
                                                    <a href="#"
                                                       className="text-gray-600 text-hover-primary">
                                                        {order.customer ? order.customer.email : '-'}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-phone fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span></i> Phone
                                                    </div>
                                                </td>
                                                <td className="fw-bold text-end">{order.phone}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-flush py-4  flex-row-fluid">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Track</h2>
                                    </div>
                                </div>

                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table
                                            className="table align-middle table-row-bordered mb-0 fs-6 gy-5 min-w-300px">
                                            <tbody className="fw-semibold text-gray-600">
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-devices fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span><span
                                                            className="path3"></span><span
                                                            className="path4"></span><span
                                                            className="path5"></span></i> Track Link


                                                        <span className="ms-1" data-bs-toggle="tooltip"
                                                              aria-label="View the invoice generated by this order."
                                                              data-bs-original-title="View the invoice generated by this order."
                                                              data-kt-initialized="1">
	<i className="ki-duotone ki-information-5 text-gray-500 fs-6"><span className="path1"></span><span
        className="path2"></span><span className="path3"></span></i></span></div>
                                                </td>
                                                <td className="fw-bold text-end"><a
                                                    href={trackingLink} target={'_blank'}
                                                    className="text-gray-600 text-hover-primary">
                                                    View
                                                </a></td>
                                            </tr>
                                            <tr>
                                                <td className="text-muted">
                                                    <div className="d-flex align-items-center">
                                                        <i className="ki-duotone ki-truck fs-2 me-2"><span
                                                            className="path1"></span><span
                                                            className="path2"></span><span
                                                            className="path3"></span><span
                                                            className="path4"></span><span
                                                            className="path5"></span></i> Shipping Label URL


                                                        <span className="ms-1" data-bs-toggle="tooltip"
                                                              aria-label="View the shipping manifest generated by this order."
                                                              data-bs-original-title="View the shipping manifest generated by this order."
                                                              data-kt-initialized="1">
	<i className="ki-duotone ki-information-5 text-gray-500 fs-6"><span className="path1"></span><span
        className="path2"></span><span className="path3"></span></i></span></div>
                                                </td>
                                                <td className="fw-bold text-end"><a href={shippingLabelUrl}
                                                                                    target={'_blank'}
                                                                                    className="text-gray-600 text-hover-primary">View</a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Tab.Container defaultActiveKey='settingsNav-0'>
                            <div className='row'>
                                <div className='col-lg-4 col-xl-3'>
                                    <Nav variant='pills' className='flex-column settings-nav'>
                                        {memoizedNavItems.map((settings, index) => (
                                            <Nav.Item key={`settings-nav-${index}`} className='mb-5'>
                                                <Nav.Link
                                                    className='settings-nav-item'
                                                    eventKey={`settingsNav-${index}`}
                                                >
                                                    <div className='settings-nav-icon w-25px h-25px bg-transparent'>
                                                        <i className={`${settings.icon}`}></i>
                                                    </div>
                                                    <div className='settings-nav-label'>
                                                <span
                                                    className='settings-nav-title text-gray-800'>{settings.title}</span>
                                                        <span className='settings-nav-desc text-gray-500'>
                                                    {settings.description}
                                                </span>
                                                    </div>
                                                </Nav.Link>
                                            </Nav.Item>
                                        ))}
                                    </Nav>
                                </div>
                                <div className='col-lg-8 col-xl-9'>
                                    {order && (
                                        <Tab.Content>
                                            <Tab.Pane key={`pane-0`} eventKey={`settingsNav-0`}>
                                                <div
                                                    className="d-flex flex-column flex-xl-row gap-7 gap-lg-10 mb-10">
                                                    <div
                                                        className="card card-flush py-4 flex-row-fluid position-relative">
                                                        <div
                                                            className="position-absolute top-0 end-0 bottom-0 opacity-10 d-flex align-items-center me-5">
                                                            <i className="ki-solid ki-two-credit-cart"
                                                               style={{fontSize: '14em'}}>
                                                            </i>
                                                        </div>

                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h2>Billing Address</h2>
                                                            </div>
                                                        </div>

                                                        <div className="card-body pt-0">
                                                            {(order.paymentRequest.request_data as {
                                                                shipping_details: { address: { line1: string } }
                                                            }).shipping_details?.address?.line1},<br/>
                                                            {(order.paymentRequest.request_data as {
                                                                shipping_details: { address: { state: string } }
                                                            }).shipping_details?.address?.state},<br/>
                                                            {(order.paymentRequest.request_data as {
                                                                shipping_details: { address: { city: string } }
                                                            }).shipping_details?.address?.city &&
                                                            (order.paymentRequest.request_data as {
                                                                shipping_details: { address: { city: string } }
                                                            }).shipping_details?.address?.city !== '' ?
                                                                (order.paymentRequest.request_data as {
                                                                    shipping_details: { address: { city: string } }
                                                                }).shipping_details?.address?.city :
                                                                (order.paymentRequest.request_data as {
                                                                    shipping_details: { address: { country: string } }
                                                                }).shipping_details?.address?.country
                                                            },<br/>
                                                            {(order.paymentRequest.request_data as {
                                                                shipping_details: { address: { country: string } }
                                                            }).shipping_details?.address?.country}.
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="card card-flush py-4 flex-row-fluid position-relative">
                                                        <div
                                                            className="position-absolute top-0 end-0 bottom-0 opacity-10 d-flex align-items-center me-5">
                                                            <i className="ki-solid ki-delivery"
                                                               style={{fontSize: '13em'}}>
                                                            </i>
                                                        </div>

                                                        <div className="card-header">
                                                            <div className="card-title">
                                                                <h2>Shipping Address</h2>
                                                            </div>
                                                        </div>

                                                        <div className="card-body pt-0">
                                                            {(order.paymentRequest.request_data as {
                                                                customer_details: { address: { line1: string } }
                                                            }).customer_details?.address?.line1},<br/>
                                                            {(order.paymentRequest.request_data as {
                                                                customer_details: { address: { state: string } }
                                                            }).customer_details?.address?.state},<br/>
                                                            {(order.paymentRequest.request_data as {
                                                                customer_details: { address: { city: string } }
                                                            }).customer_details?.address?.city &&
                                                            (order.paymentRequest.request_data as {
                                                                customer_details: { address: { city: string } }
                                                            }).customer_details?.address?.city !== '' ?
                                                                (order.paymentRequest.request_data as {
                                                                    customer_details: { address: { city: string } }
                                                                }).customer_details?.address?.city :
                                                                (order.paymentRequest.request_data as {
                                                                    shipping_details: { address: { country: string } }
                                                                }).shipping_details?.address?.country
                                                            },<br/>
                                                            {(order.paymentRequest.request_data as {
                                                                customer_details: { address: { country: string } }
                                                            }).customer_details?.address?.country}.
                                                        </div>

                                                    </div>
                                                </div>

                                                <div
                                                    className="card card-flush py-4 flex-row-fluid overflow-hidden mb-10">
                                                    <div className="card-header">
                                                        <div className="card-title">
                                                            <h2>Order #14534</h2>
                                                        </div>
                                                    </div>

                                                    <div className="card-body pt-0">
                                                        <div className="table-responsive">
                                                            <table
                                                                className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                                                                <thead>
                                                                <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                                                    <th className="min-w-175px">Product</th>
                                                                    <th className="min-w-100px text-end">SKU</th>
                                                                    <th className="min-w-70px text-end">Qty</th>
                                                                    <th className="min-w-100px text-end">Unit
                                                                        Price
                                                                    </th>
                                                                    <th className="min-w-100px text-end">Total</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody className="fw-semibold text-gray-600">
                                                                {
                                                                    order.products.map((orderProduct) => {
                                                                        const product = orderProduct.product
                                                                        return (
                                                                            <tr key={`product-${orderProduct.product.sku}`}>
                                                                                <td>
                                                                                    <div
                                                                                        className="d-flex align-items-center">
                                                                                        <div
                                                                                            className="symbol symbol-50px">
                                                            <span className="symbol-label"
                                                                  style={{backgroundImage: "url('" + storageUrl(product.thumbnail.media[DEFAULT_RESPONSIVE_IMAGE_SIZE]) + "')"}}></span>
                                                                                        </div>

                                                                                        <div className="ms-5">
                                                                                            <div
                                                                                               className="fw-bold text-gray-600 text-hover-primary">
                                                                                                {product.name[DEFAULT_LANGUAGE]}
                                                                                            </div>
                                                                                            {/*<div*/}
                                                                                            {/*    className="fs-7 text-muted">*/}
                                                                                            {/*    Delivery Date:*/}
                                                                                            {/*    17/12/2024*/}
                                                                                            {/*</div>*/}
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                                <td className="text-end">
                                                                                    {product.sku}
                                                                                </td>
                                                                                <td className="text-end">
                                                                                    {orderProduct.quantity}
                                                                                </td>
                                                                                <td className="text-end">
                                                                                    {orderProduct.single_price} AED
                                                                                </td>
                                                                                <td className="text-end">
                                                                                    {orderProduct.total_price} AED
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                                <tr>
                                                                    <td colSpan={4} className="text-end">
                                                                        Subtotal
                                                                    </td>
                                                                    <td className="text-end">
                                                                        {order.subtotal_price} AED
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan={4} className="text-end">
                                                                        Shipping Rate
                                                                    </td>
                                                                    <td className="text-end">
                                                                        {order.shipping} AED
                                                                    </td>
                                                                </tr>
                                                                {order.discount &&
                                                                    <tr>
                                                                        <td colSpan={4} className="text-end">
                                                                            Discount
                                                                        </td>
                                                                        <td className="text-end">
                                                                           -{order.discount} AED
                                                                        </td>
                                                                    </tr>
                                                                }
                                                                <tr>
                                                                    <td colSpan={4}
                                                                        className="fs-3 text-gray-900 text-end">
                                                                        Grand Total
                                                                    </td>
                                                                    <td className="text-gray-900 fs-3 fw-bolder text-end">
                                                                    {order.total_price} AED
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Tab.Pane>

                                            <Tab.Pane key={`pane-1`} eventKey={`settingsNav-1`}>
                                                <div
                                                    className="card card-flush py-4 flex-row-fluid position-relative">

                                                    <div className="card-body pt-0">
                                                        <div className="table-responsive">
                                                            <table
                                                                className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                                                                <thead>
                                                                <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                                                    <th className="min-w-100px">Date Added</th>
                                                                    <th className="min-w-70px">Order Status</th>
                                                                    <th className="min-w-70px">Comment</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody className="fw-semibold text-gray-600">
                                                                {
                                                                    orderHistory?.slice()
                                                                        .reverse()
                                                                        .map((history, index) => {
                                                                            return (
                                                                                <tr key={`history-${index}`}>
                                                                                    <td>{history.date}</td>
                                                                                    <td>
                                                                                        <div
                                                                                            className="badge badge-light-primary">
                                                                                            {capitalizeFirstLetter(history.status)}
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        {history.comment}
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Tab.Pane>

                                            <Tab.Pane key={`pane-2`} eventKey={`settingsNav-2`}>


                                                {order.payout ?
                                                    <PayoutSummaryTable data={order.payout}
                                                                        customerEmail={order.customer ? order.customer.email : '-'}/>
                                                    :
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="text-center py-5">
                                                                <div className="mb-4">

                                                                    <i className="bi bi-info-circle fs-1"></i>
                                                                </div>
                                                                <h4 className="mb-3">No Payout Details Available</h4>
                                                                <p className="text-muted">
                                                                    There are currently no payout details to display.
                                                                    <br/>
                                                                    Payout information will appear here once
                                                                    transactions are processed.
                                                                </p>
                                                                <div
                                                                    className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
                            <span className="badge bg-light  border py-3">
                                <i className="fa-solid fa-chart-line me-3"></i> Awaiting Data</span>
                                                                    <span
                                                                        className="badge bg-light border py-3">
                                <i className="fa-solid fa-money-bill-wave me-3"></i> No Transactions</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }


                                            </Tab.Pane>
                                        </Tab.Content>
                                    )}
                                </div>
                            </div>
                        </Tab.Container>
                    </>
                )
            }
        </>
    );
}

export default OrderShow;