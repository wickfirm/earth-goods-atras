import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import CategoryIndex from '../../pages/commerce/categories/pages/Index';
import CategoryCreate from '../../pages/commerce/categories/pages/Create';
import CategoryEdit from '../../pages/commerce/categories/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

import CategoryReorder from "../../pages/commerce/categories/pages/Reorder.tsx";

const categoriesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_CATEGORIES,
        path: '/commerce/categories/',
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

const CategoryRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Categories'}</PageTitle>
                    <CategoryIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={categoriesBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <CategoryCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/reorder'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={categoriesBreadcrumbs} showPageTitle={false}>{'Reorder'}</PageTitle>
                        <CategoryReorder/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={categoriesBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <CategoryEdit/>
                    </SuspenseView>
                }
            />


        </Routes>
    )
}

export default CategoryRoutes;
