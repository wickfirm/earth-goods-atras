import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import CustomerIndex from "../../pages/commerce/customers/pages/Index.tsx";
import CustomerShow from "../../pages/commerce/customers/pages/Show.tsx";
import GuestCustomerShow from "../../pages/commerce/customers/pages/GuestShow.tsx";
// import CustomerShow from "../../pages/commerce/customers/pages/Show.tsx";

const customersBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_CUSTOMERS,
        path: '/commerce/customers/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const CustomerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Customers'}</PageTitle>
                    <CustomerIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/:id'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={customersBreadcrumbs} showPageTitle={false}>{'Show'}</PageTitle>
                        <CustomerShow/>
                    </SuspenseView>
                }
            />

            <Route
                path='/customer'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={customersBreadcrumbs} showPageTitle={false}>{'Show'}</PageTitle>
                        <CustomerShow/>
                    </SuspenseView>
                }
            />

            <Route
                path='/guest/:id'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={customersBreadcrumbs} showPageTitle={false}>{'Show'}</PageTitle>
                        <GuestCustomerShow/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default CustomerRoutes;
