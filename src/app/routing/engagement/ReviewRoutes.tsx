import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import ReviewIndex from '../../pages/engagement/reviews/pages/Index';
import ReviewEdit from '../../pages/engagement/reviews/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

const reviewsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.ENGAGEMENT_REVIEWS,
        path: '/engagement/reviews/',
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

const ReviewRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Product Reviews'}</PageTitle>
                    <ReviewIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={reviewsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <ReviewEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default ReviewRoutes;
