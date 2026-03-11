import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import ClaimIndex from '../../pages/commerce/claims/pages/Index';
import ClaimCreate from '../../pages/commerce/claims/pages/Create';
import ClaimEdit from '../../pages/commerce/claims/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

const claimsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_CLAIMS,
        path: '/commerce/claims/',
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

const ClaimRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Claims'}</PageTitle>
                    <ClaimIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={claimsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <ClaimCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={claimsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <ClaimEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default ClaimRoutes;
