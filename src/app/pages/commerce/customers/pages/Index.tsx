import React, {useEffect, useState} from 'react'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {QUERIES} from "../../../../../_metronic/helpers";
import {ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import {
    ACTIVE_EXPORT_ENDPOINT,
    getActiveCustomers,
    getGuestCustomers,
    getPotentialCustomers,
    GUEST_EXPORT_ENDPOINT, POTENTIAL_EXPORT_ENDPOINT
} from "../../../../requests/commerce/Customer.ts";
import {CustomersColumns} from "../core/TableColumns.tsx";
import CustomerIndexFilter from "../partials/IndexFilter.tsx";
import {GuestCustomersColumns} from "../core/GuestTableColumns.tsx";

const CustomerIndex = () => {
    const wickApp = useWickApp();
    const [activeTab, setActiveTab] = useState<string>("guest");

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_CUSTOMERS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <ul className="nav nav-wick nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-n2"
                role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        type="button"
                        className={`nav-link text-active-twfirm pb-4 ${activeTab === "guest" ? "active border-twfirm" : ""}`}
                        onClick={() => setActiveTab("guest")}
                        role="tab"
                    >
                        Guest Customers
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        type="button"
                        className={`nav-link text-active-twfirm pb-4 ${activeTab === "active" ? "active border-twfirm" : ""}`}
                        onClick={() => setActiveTab("active")}
                        role="tab"
                    >
                        Active Customers
                    </button>
                </li>
            </ul>

            <div className="tab-content">
                {activeTab === "guest" && (
                    <div className="tab-pane fade active show" id="kt_ecommerce_add_product_guest"
                         role="tabpanel">
                        <div className="d-flex flex-column gap-7 gap-lg-10">
                            <WickIndex queryId={QUERIES.COMMERCE_GUEST_CUSTOMERS_LIST}
                                       requestFunction={getGuestCustomers}
                                       columnsArray={GuestCustomersColumns}
                                       cardHeader={
                                           {
                                               text: 'All Guest Customers',
                                               actions: [new ExportCardAction(exportQuery, GUEST_EXPORT_ENDPOINT),
                                                   new FilterCardAction('guest-customers-list-filter', showFilter, setShowFilter)]
                                           }}
                                       showFilter={showFilter}
                                       setExportQuery={setExportQuery}
                                       FilterComponent={CustomerIndexFilter}
                                       ktCardHeaderClasses={'border-0'}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="tab-content">
                {activeTab === "active" && (
                    <div className="tab-pane fade active show" id="kt_ecommerce_add_product_active"
                         role="tabpanel">
                        <div className="d-flex flex-column gap-7 gap-lg-10">
                            <WickIndex queryId={QUERIES.COMMERCE_ACTIVE_CUSTOMERS_LIST}
                                       requestFunction={getActiveCustomers}
                                       columnsArray={CustomersColumns}
                                       cardHeader={
                                           {
                                               text: 'All Active Customers',
                                               actions: [new ExportCardAction(exportQuery, ACTIVE_EXPORT_ENDPOINT),
                                                   new FilterCardAction('active-customers-list-filter', showFilter, setShowFilter)]
                                           }}
                                       showFilter={showFilter}
                                       setExportQuery={setExportQuery}
                                       FilterComponent={CustomerIndexFilter}
                                       ktCardHeaderClasses={'border-0'}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerIndex;
