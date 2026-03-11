import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import CollectionIndex from '../../pages/misc/collections/pages/Index';
import CollectionCreate from '../../pages/misc/collections/pages/Create';
import CollectionEdit from '../../pages/misc/collections/pages/Edit';
import {Sections} from '../../helpers/sections';

const collectionsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_COLLECTIONS,
        path: '/misc/collections/',
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

const CollectionRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Collections'}</PageTitle>
                    <CollectionIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={collectionsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <CollectionCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={collectionsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <CollectionEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default CollectionRoutes;
