import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import IngredientIndex from '../../pages/commerce/ingredients/pages/Index';
import IngredientCreate from '../../pages/commerce/ingredients/pages/Create';
import IngredientEdit from '../../pages/commerce/ingredients/pages/Edit';
import {Sections} from '../../helpers/sections.ts';

const ingredientsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.COMMERCE_INGREDIENTS,
        path: '/commerce/ingredients/',
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

const IngredientRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Ingredients'}</PageTitle>
                    <IngredientIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={ingredientsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <IngredientCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={ingredientsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <IngredientEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default IngredientRoutes;
