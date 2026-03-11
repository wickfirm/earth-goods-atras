import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import NutritionalAttributeIndex from '../../pages/commerce/nutritional-attributes/pages/Index';
import NutritionalAttributeCreate from '../../pages/commerce/nutritional-attributes/pages/Create';
import NutritionalAttributeEdit from '../../pages/commerce/nutritional-attributes/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

const nutritionalAttributesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_TAGS,
        path: '/commerce/nutritional-attributes/',
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

const NutritionalAttributeRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Nutritional Attributes'}</PageTitle>
                    <NutritionalAttributeIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={nutritionalAttributesBreadcrumbs}
                                   showPageTitle={false}>{'Create'}</PageTitle>
                        <NutritionalAttributeCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={nutritionalAttributesBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <NutritionalAttributeEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default NutritionalAttributeRoutes;
