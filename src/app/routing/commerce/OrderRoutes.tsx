import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import OrderIndex from "../../pages/commerce/orders/pages/Index.tsx";
import OrderShow from "../../pages/commerce/orders/pages/Show.tsx";

const ordersBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_ORDERS,
        path: '/commerce/orders/',
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

const OrderRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Orders'}</PageTitle>
                    <OrderIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/:id'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={ordersBreadcrumbs} showPageTitle={false}>{'Show'}</PageTitle>
                        <OrderShow/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default OrderRoutes;
