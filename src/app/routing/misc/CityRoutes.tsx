import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import CityIndex from '../../pages/misc/cities/pages/Index';
import CityCreate from '../../pages/misc/cities/pages/Create';
import CityEdit from '../../pages/misc/cities/pages/Edit';
import {Sections} from '../../helpers/sections';

const citiesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_CITIES,
        path: '/misc/cities/',
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

const CityRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Cities'}</PageTitle>
                    <CityIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={citiesBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <CityCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={citiesBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <CityEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default CityRoutes;
