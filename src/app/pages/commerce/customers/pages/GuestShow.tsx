import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {Customer} from "../../../../models/commerce/Customer.ts";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {getCustomer, getGuestCustomer} from "../../../../requests/commerce/Customer.ts";
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../../helpers/sections.ts";
import {PageTypes} from "../../../../helpers/variables.ts";
import {capitalizeFirstLetter} from "../../../../helpers/stringGenerator.ts";
import {formatDateToDateTime} from "../../../../helpers/dateFormatter.ts";
import {DEFAULT_LANGUAGE} from "../../../../helpers/settings.ts";
import {Address} from "../../../../models/commerce/Address.ts";

// Lazy load sections to improve performance

// Memoize settingsNav to prevent re-rendering
const settingsNav = [
    {
        id: 1,
        title: "Customer Summary",
        description: "View a summary of your current customers, including quantities, prices, and statuses.",
        icon: "fa fa-list-alt",
    },
    {
        id: 2,
        title: "Customer History",
        description: "Access a detailed log of your past customers with dates and fulfillment statuses.",
        icon: "fa fa-history",
    },
];

const GuestCustomerShow = () => {
    const wickApp = useWickApp();
    const {id} = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<Customer | null>(null);
    const [billingAddress, setBillingAddress] = useState<Address | null>(null);
    const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
    const [trackingLink, setTrackingLink] = useState<string>("");
    const [shippingLabelUrl, setShippingLabelUrl] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>('transactions');

    useEffect(() => {
        if (id) {
            submitRequest(getGuestCustomer, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response);

                if (errorPage) {
                    navigate(errorPage);
                } else {
                    setCustomer(response);

                    setBillingAddress(response.addresses.find((address: Address) => address.type.id === 'billing'))
                    setShippingAddress(response.addresses.find((address: Address) => address.type.id === 'shipping'))
                }
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_ORDERS, PageTypes.SHOW, 'Customer'))
    }, [wickApp]);


    return (
        <div className="d-flex flex-column flex-xl-row">
            <div className="flex-column flex-lg-row-auto w-100 w-xl-350px mb-10">
                <div className="card mb-5 mb-xl-8">
                    <div className="card-body pt-15">
                        <div className="d-flex flex-center flex-column mb-5">
                            <div className="symbol symbol-150px symbol-circle mb-7">
                                <img src="/media/avatars/blank.png" alt="image"/>
                            </div>

                            {
                                customer ?
                                    <>
                                        <a href="#" className="fs-3 text-gray-800 text-hover-primary fw-bold mb-1">
                                            {customer?.name}
                                        </a>

                                        <a href="#" className="fs-5 fw-semibold text-muted text-hover-primary mb-6">
                                            {customer?.email}
                                        </a>
                                    </>
                                    :
                                    <>
                                        <div
                                            className="fs-5 fw-semibold text-muted text-hover-primary mb-6 text-center">
                                            Guest
                                        </div>
                                    </>
                            }
                        </div>

                        <div className="d-flex flex-stack fs-4 py-3">
                            <div className="fw-bold">
                                Details
                            </div>

                            {/*{*/}
                            {/*    !customer?.user && (*/}
                            {/*        <div className="badge badge-light-info d-inline">Guest User</div>*/}
                            {/*    )*/}
                            {/*}*/}
                        </div>

                        <div className="separator separator-dashed my-3"></div>

                        <div className="pb-5 fs-6">
                            {/*<div className="fw-bold mt-5">Account ID</div>*/}
                            {/*<div className="text-gray-600">ID-{customer?.account_id}</div>*/}

                            {/*<div className="fw-bold mt-5">Billing Email</div>*/}
                            {/*<div className="text-gray-600"><a href="#"*/}
                            {/*                                  className="text-gray-600 text-hover-primary">info@keenthemes.com</a>*/}
                            {/*</div>*/}

                            {/*<div className="fw-bold mt-5">Delivery Address</div>*/}
                            {/*<div className="text-gray-600">101 Collin Street, <br/>Melbourne 3000 VIC<br/>Australia*/}
                            {/*</div>*/}

                            <div className="fw-bold mt-5">Language</div>
                            <div className="text-gray-600">English</div>

                            <div className="fw-bold mt-5">Latest Transaction</div>
                            <div className="text-gray-600"><a href="#"
                                                              className="text-gray-600 text-hover-primary">#{customer && customer?.orders && customer?.orders.length > 0 && customer?.orders[0].order_number}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-lg-row-fluid ms-lg-15">
                <ul className="nav nav-wick nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2"
                    role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            type="button"
                            className={`nav-link text-active-twfirm pb-4 ${activeTab === 'transactions' ? 'active border-twfirm' : ''}`}
                            onClick={() => setActiveTab('transactions')}
                            role="tab"
                        >
                            Transactions
                        </button>
                    </li>

                    <li className="nav-item" role="presentation">
                        <button
                            type="button"
                            className={`nav-link text-active-twfirm pb-4 ${activeTab === 'saved_products' ? 'active border-twfirm' : ''}`}
                            onClick={() => setActiveTab('saved_products')}
                            role="tab"
                        >
                            Saved Products
                        </button>
                    </li>

                    <li className="nav-item" role="presentation">
                        <button
                            type="button"
                            className={`nav-link text-active-twfirm pb-4 ${activeTab === 'addresses' ? 'active border-twfirm' : ''}`}
                            onClick={() => setActiveTab('addresses')}
                            role="tab"
                        >
                            Addresses
                        </button>
                    </li>
                </ul>

                <div className="tab-content mt-10">
                    {activeTab === 'transactions' && (
                        <div className="tab-pane fade active show" id="kt_ecommerce_add_transactions"
                             role="tabpanel">
                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                <div className="row row-cols-1 row-cols-md-2 mb-6 mb-xl-9">
                                    <div className="col">
                                        <div className="card pt-4 h-md-100 mb-6 mb-md-0">
                                            <div className="card-header border-0">
                                                <div className="card-title">
                                                    <h2 className="fw-bold">Orders</h2>
                                                </div>
                                            </div>

                                            <div className="card-body pt-0">
                                                <div className="fw-bold fs-2">
                                                    <div className="d-flex">
                                                        <i className="ki-duotone ki-basket text-info fs-2x">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span>
                                                        </i>
                                                        <div className="ms-2">
                                                            {customer?.orders?.length} <span className="text-muted fs-4 fw-semibold">Total Orders</span>
                                                        </div>
                                                    </div>
                                                    <div className="fs-7 fw-normal text-muted">
                                                        Track and manage all your orders from a single place.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col">
                                        <a href="#" className="card bg-info hoverable h-md-100">
                                            <div className="card-body">
                                                <i className="ki-duotone ki-wallet text-white fs-3x ms-n1"><span
                                                    className="path1"></span><span className="path2"></span><span
                                                    className="path3"></span></i>
                                                <div className="text-white fw-bold fs-2 mt-5">
                                                    {
                                                        customer?.orders.reduce((total, order) => {
                                                            return total + parseFloat((order.total_price as string))
                                                        }, 0)
                                                    } AED
                                                </div>

                                                <div className="fw-semibold text-white">
                                                    Lifetime Value
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div className="card pt-4 mb-6 mb-xl-9">
                                    <div className="card-header border-0">
                                        <div className="card-title">
                                            <h2>Transaction History</h2>
                                        </div>
                                    </div>

                                    <div className="card-body pt-0 pb-5">
                                        <div id="kt_table_customers_payment_wrapper"
                                             className="dt-container dt-bootstrap5 dt-empty-footer">
                                            <div id="" className="table-responsive">
                                                <table className="table align-middle table-row-dashed gy-5 dataTable"
                                                       id="kt_table_customers_payment" style={{width: '100%'}}>
                                                    <thead className="border-bottom border-gray-200 fs-7 fw-bold">
                                                    <tr className="text-start text-muted text-uppercase gs-0">
                                                        <th className="min-w-100px dt-orderable-asc dt-orderable-desc"
                                                            data-dt-column="0" rowSpan={1} colSpan={1}
                                                            aria-label="order No.: Activate to sort" tabIndex={0}><span
                                                            className="dt-column-title"
                                                            role="button">order No.</span><span
                                                            className="dt-column-order"></span></th>
                                                        <th data-dt-column="1" rowSpan={1} colSpan={1}
                                                            className="dt-orderable-asc dt-orderable-desc"
                                                            aria-label="Status: Activate to sort" tabIndex={0}><span
                                                            className="dt-column-title" role="button">Status</span><span
                                                            className="dt-column-order"></span></th>
                                                        <th data-dt-column="2" rowSpan={1} colSpan={1}
                                                            className="dt-type-numeric dt-orderable-asc dt-orderable-desc"
                                                            aria-label="Amount: Activate to sort" tabIndex={0}><span
                                                            className="dt-column-title" role="button">Amount</span><span
                                                            className="dt-column-order"></span></th>
                                                        <th className="min-w-100px dt-orderable-none" data-dt-column="4"
                                                            rowSpan={1} colSpan={1} aria-label="Date"><span
                                                            className="dt-column-title">Date</span><span
                                                            className="dt-column-order"></span></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="fs-6 fw-semibold text-gray-600">
                                                    {
                                                        customer?.orders.map((order) => {
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <a href="#"
                                                                           className="text-gray-600 text-hover-primary mb-1">#{order.order_number}</a>
                                                                    </td>
                                                                    <td>
                                                                    <span
                                                                        className="badge badge-light-info">{capitalizeFirstLetter(order.paymentRequest.paymentResponse.payment_status)}</span>
                                                                    </td>
                                                                    <td className="dt-type-numeric">
                                                                        {order.total_price} AED
                                                                    </td>
                                                                    <td>
                                                                        {formatDateToDateTime(order.created_at)}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    </tbody>
                                                    <tfoot></tfoot>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'saved_products' && (
                        <div className="tab-pane fade active show" id="kt_ecommerce_add_saved_products"
                             role="tabpanel">
                            <div className="d-flex flex-column gap-7 gap-lg-10">
                                <div className="card pt-4 mb-6 mb-xl-9">
                                    <div className="card-header border-0">
                                        <div className="card-title">
                                            <h2>Saved Products</h2>
                                        </div>
                                    </div>

                                    <div className="card-body pt-0 pb-5">
                                        <div id="kt_table_customers_payment_wrapper"
                                             className="dt-container dt-bootstrap5 dt-empty-footer">
                                            <div id="" className="table-responsive">
                                                <table className="table align-middle table-row-dashed gy-5 dataTable"
                                                       id="kt_table_customers_payment" style={{width: '100%'}}>
                                                    <thead className="border-bottom border-gray-200 fs-7 fw-bold">
                                                    <tr className="text-start text-muted text-uppercase gs-0">
                                                        <th className="min-w-100px dt-orderable-asc dt-orderable-desc"
                                                            data-dt-column="0" rowSpan={1} colSpan={1} tabIndex={0}>
                                                            <span className="dt-column-title"
                                                                  role="button">Product</span>
                                                            <span className="dt-column-order"></span>
                                                        </th>
                                                        <th className="min-w-100px dt-orderable-asc dt-orderable-desc"
                                                            data-dt-column="0" rowSpan={1} colSpan={1} tabIndex={0}>
                                                            <span className="dt-column-title"
                                                                  role="button">Quantity</span>
                                                            <span className="dt-column-order"></span>
                                                        </th>
                                                        <th className="min-w-100px dt-orderable-asc dt-orderable-desc"
                                                            data-dt-column="0" rowSpan={1} colSpan={1} tabIndex={0}>
                                                            <span className="dt-column-title"
                                                                  role="button">Unit Price</span>
                                                            <span className="dt-column-order"></span>
                                                        </th>
                                                        <th className="min-w-100px dt-orderable-asc dt-orderable-desc"
                                                            data-dt-column="0" rowSpan={1} colSpan={1} tabIndex={0}>
                                                            <span className="dt-column-title" role="button">Discounted Price</span>
                                                            <span className="dt-column-order"></span>
                                                        </th>
                                                        <th className="min-w-100px dt-orderable-asc dt-orderable-desc"
                                                            data-dt-column="0" rowSpan={1} colSpan={1} tabIndex={0}>
                                                            <span className="dt-column-title"
                                                                  role="button">Added At</span>
                                                            <span className="dt-column-order"></span>
                                                        </th>
                                                    </tr>
                                                    </thead>

                                                    {customer?.savedProducts && customer?.savedProducts.length > 0 ? (
                                                        <tbody className="fs-6 fw-semibold text-gray-600">
                                                        {customer?.savedProducts.map((savedProduct) => (
                                                            <tr key={savedProduct.id}>
                                                                <td>
                                                                    <a href="#"
                                                                       className="text-gray-600 text-hover-primary mb-1">
                                                                        #{savedProduct.product.name[DEFAULT_LANGUAGE]}
                                                                    </a>
                                                                </td>
                                                                <td className="dt-type-numeric">
                                                                    {savedProduct.quantity}
                                                                </td>
                                                                <td className="dt-type-numeric">
                                                                    {savedProduct.unit_price} AED
                                                                </td>
                                                                <td className="dt-type-numeric">
                                                                    {savedProduct.discounted_price} AED
                                                                </td>
                                                                <td>
                                                                    {formatDateToDateTime(savedProduct.created_at)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    ) : (
                                                        <tbody>
                                                        <tr>
                                                            <td colSpan={5}
                                                                className="text-center py-5 fs-6 text-gray-600">
                                                                There are currently no saved products associated with
                                                                this customer.
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    )}
                                                    <tfoot></tfoot>
                                                </table>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'addresses' && (
                        <div className="tab-pane fade active show" id="kt_ecommerce_add_addresses"
                             role="tabpanel">

                            <div className="card pt-4 mb-6 mb-xl-9">
                                <div className="card-header border-0">
                                    <div className="card-title">
                                        <h2 className="fw-bold mb-0">Addresses</h2>
                                    </div>
                                </div>

                                <div id="kt_customer_view_payment_method" className="card-body pt-0">
                                    <div className="accordion accordion-icon-toggle"
                                         id="kt_customer_view_payment_method_accordion">
                                        <div className="py-0" data-kt-customer-payment-method="row">
                                            <div className="py-3 d-flex flex-stack flex-wrap">
                                                <div className="accordion-header d-flex align-items-center collapsed"
                                                     data-bs-toggle="collapse"
                                                     role="button" aria-expanded="false"
                                                     aria-controls="kt_customer_view_payment_method_3">
                                                    <div className="accordion-icon me-2">
                                                        <i className="ki-duotone ki-right fs-4"></i></div>
                                                    <div className="me-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="text-gray-800 fw-bold">
                                                                Billing Address
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="kt_customer_view_payment_method_3" className="fs-6 ps-10">
                                                <div className="d-flex flex-wrap py-5">
                                                    <div className="flex-equal me-5">
                                                        <table className="table table-flush fw-semibold gy-1">
                                                            <tbody>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">Country</td>
                                                                <td className="text-gray-800">{billingAddress?.country}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">City</td>
                                                                <td className="text-gray-800">{billingAddress?.city}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">Address</td>
                                                                <td className="text-gray-800">{billingAddress?.address}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">State</td>
                                                                <td className="text-gray-800">
                                                                    {billingAddress?.state}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">Zip
                                                                    Code
                                                                </td>
                                                                <td className="text-gray-800">{billingAddress?.zip_code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">
                                                                    Phone
                                                                </td>
                                                                <td className="text-gray-800">{billingAddress?.phone}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="separator separator-dashed"></div>

                                    <div className="py-3 accordion accordion-icon-toggle"
                                         id="kt_customer_view_payment_method_accordion">
                                        <div className="py-0" data-kt-customer-payment-method="row">
                                            <div className="py-3 d-flex flex-stack flex-wrap">
                                                <div className="accordion-header d-flex align-items-center collapsed"
                                                     data-bs-toggle="collapse"
                                                     role="button" aria-expanded="false"
                                                     aria-controls="kt_customer_view_payment_method_3">
                                                    <div className="accordion-icon me-2">
                                                        <i className="ki-duotone ki-right fs-4"></i></div>
                                                    <div className="me-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="text-gray-800 fw-bold">
                                                                Shipping Address
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="kt_customer_view_payment_method_3" className="fs-6 ps-10">
                                                <div className="d-flex flex-wrap py-5">
                                                    <div className="flex-equal me-5">
                                                        <table className="table table-flush fw-semibold gy-1">
                                                            <tbody>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">Country</td>
                                                                <td className="text-gray-800">{shippingAddress?.country}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">City</td>
                                                                <td className="text-gray-800">{shippingAddress?.city}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">Address</td>
                                                                <td className="text-gray-800">{shippingAddress?.address}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">State</td>
                                                                <td className="text-gray-800">
                                                                    {shippingAddress?.state}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">Zip
                                                                    Code
                                                                </td>
                                                                <td className="text-gray-800">{shippingAddress?.zip_code}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="text-muted min-w-125px w-125px">
                                                                    Phone
                                                                </td>
                                                                <td className="text-gray-800">{shippingAddress?.phone}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GuestCustomerShow;