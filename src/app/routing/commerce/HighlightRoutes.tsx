import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import HighlightIndex from '../../pages/commerce/highlights/pages/Index';
import HighlightCreate from '../../pages/commerce/highlights/pages/Create';
import HighlightEdit from '../../pages/commerce/highlights/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

const highlightsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_HIGHLIGHT,
        path: '/commerce/highlights/',
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

const HighlightRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Highlights'}</PageTitle>
                    <HighlightIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={highlightsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <HighlightCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={highlightsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <HighlightEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default HighlightRoutes;
