import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import LifestyleIndex from '../../pages/commerce/lifestyles/pages/Index';
import LifestyleCreate from '../../pages/commerce/lifestyles/pages/Create';
import LifestyleEdit from '../../pages/commerce/lifestyles/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

const lifestylesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_LIFESTYLE,
        path: '/commerce/lifestyles/',
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

const LifestyleRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Lifestyles'}</PageTitle>
                    <LifestyleIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={lifestylesBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <LifestyleCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={lifestylesBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <LifestyleEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default LifestyleRoutes;
