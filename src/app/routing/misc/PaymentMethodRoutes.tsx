import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import PaymentMethodIndex from '../../pages/misc/payment-methods/pages/Index';
import PaymentMethodCreate from '../../pages/misc/payment-methods/pages/Create';
import PaymentMethodEdit from '../../pages/misc/payment-methods/pages/Edit';
import {Sections} from '../../helpers/sections';

const paymentMethodsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_CITIES,
        path: '/misc/payment-methods/',
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

const PaymentMethodRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'PaymentMethods'}</PageTitle>
                    <PaymentMethodIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={paymentMethodsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <PaymentMethodCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={paymentMethodsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <PaymentMethodEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PaymentMethodRoutes;
