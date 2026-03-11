import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import RecipeIndex from '../../pages/content/recipes/pages/Index';
import RecipeCreate from '../../pages/content/recipes/pages/Create';
import RecipeEdit from '../../pages/content/recipes/pages/Edit';
import {Sections} from '../../helpers/sections';

const recipesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_RECIPES,
        path: '/content/recipes/',
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

const RecipeRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Recipes'}</PageTitle>
                    <RecipeIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={recipesBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <RecipeCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={recipesBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <RecipeEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default RecipeRoutes;
