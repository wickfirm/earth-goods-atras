import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import DiscountCodeIndex from '../../pages/commerce/discount-codes/pages/Index';
import DiscountCodeCreate from '../../pages/commerce/discount-codes/pages/Create';
// import DiscountCodeEdit from '../../pages/commerce/discount-codes/pages/Edit';
import {Sections} from '../../helpers/sections.ts';
import {ProductProvider} from "../../pages/commerce/products/core/ProductContext.tsx";

const discountCodesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_DISCOUNT_CODES,
        path: '/commerce/discount-codes/',
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

const DiscountCodeRoutes: React.FC = () => {
    return (
        <ProductProvider>
            <Routes>
                <Route index element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={[]}>{'Discount Codes'}</PageTitle>
                        <DiscountCodeIndex/>
                    </SuspenseView>
                }/>

                <Route
                    path='/create'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={discountCodesBreadcrumbs}
                                       showPageTitle={false}>{'Create'}</PageTitle>
                            <DiscountCodeCreate/>
                        </SuspenseView>
                    }
                />
                <Route
                    path='/:id/edit'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={discountCodesBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                            {/*<DiscountCodeEdit/>*/}
                        </SuspenseView>
                    }
                />
            </Routes>
        </ProductProvider>
    )
}

export default DiscountCodeRoutes;
