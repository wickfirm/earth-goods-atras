import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import CountryIndex from '../../pages/misc/countries/pages/Index';
import CountryCreate from '../../pages/misc/countries/pages/Create';
import CountryEdit from '../../pages/misc/countries/pages/Edit';
import {Sections} from '../../helpers/sections';

const countriesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.MISC_COUNTRIES,
        path: '/misc/countries/',
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

const CountryRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Countries'}</PageTitle>
                    <CountryIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={countriesBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <CountryCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={countriesBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <CountryEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default CountryRoutes;
