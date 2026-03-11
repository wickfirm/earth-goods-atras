import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import ProductIndex from '../../pages/commerce/products/pages/Index';
import {Sections} from '../../helpers/sections.ts';
import ProductCreate from "../../pages/commerce/products/pages/Create.tsx";
import {ProductProvider} from "../../pages/commerce/products/core/ProductContext.tsx";
import ProductEdit from "../../pages/commerce/products/pages/Edit.tsx";
import ProductAddBulk from "../../pages/commerce/products/pages/AddBulk.tsx";

const productsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_PRODUCTS,
        path: '/commerce/products/',
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

const ProductRoutes: React.FC = () => {
    return (
        <ProductProvider>
            <Routes>
                <Route index element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={[]}>{'Products'}</PageTitle>
                        <ProductIndex/>
                    </SuspenseView>
                }/>

                <Route
                    path='/create'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={productsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                            <ProductCreate/>
                        </SuspenseView>
                    }
                />

                <Route
                    path='/:id/edit'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={productsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                            <ProductEdit/>
                        </SuspenseView>
                    }
                />

                <Route
                    path='/bulk'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={productsBreadcrumbs} showPageTitle={false}>{'Add Bulk'}</PageTitle>
                            <ProductAddBulk/>
                        </SuspenseView>
                    }
                />
            </Routes>
        </ProductProvider>
    )
}

export default ProductRoutes;
