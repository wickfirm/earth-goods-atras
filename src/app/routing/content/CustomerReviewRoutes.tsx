import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import CustomerReviewIndex from '../../pages/content/customer-reviews/pages/Index';
import CustomerReviewCreate from '../../pages/content/customer-reviews/pages/Create';
import CustomerReviewEdit from '../../pages/content/customer-reviews/pages/Edit';
import {Sections} from '../../helpers/sections';

const customerReviewsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_RECIPES,
        path: '/content/customer-reviews/',
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

const CustomerReviewRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Customer Reviews'}</PageTitle>
                    <CustomerReviewIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={customerReviewsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <CustomerReviewCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={customerReviewsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <CustomerReviewEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default CustomerReviewRoutes;
