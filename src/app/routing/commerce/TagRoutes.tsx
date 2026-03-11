import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import TagIndex from '../../pages/commerce/tags/pages/Index';
import TagCreate from '../../pages/commerce/tags/pages/Create';
import TagEdit from '../../pages/commerce/tags/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

const tagsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_TAGS,
        path: '/commerce/tags/',
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

const TagRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Tags'}</PageTitle>
                    <TagIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={tagsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <TagCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={tagsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <TagEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default TagRoutes;
