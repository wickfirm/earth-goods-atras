import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import BulkDiscount from "../../pages/commerce/discount/pages/BulkDiscount.tsx";
import {ProductProvider} from "../../pages/commerce/products/core/ProductContext.tsx";

const discountBulkBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_DISCOUNT,
        path: '/commerce/discount/',
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

const BulkDiscountRoutes: React.FC = () => {
    return (
        <ProductProvider>
            <Routes>
                <Route
                    path='/bulk'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={discountBulkBreadcrumbs} showPageTitle={false}>{'Apply'}</PageTitle>
                            <BulkDiscount/>
                        </SuspenseView>
                    }
                />
            </Routes>
        </ProductProvider>
    )
}

export default BulkDiscountRoutes;
