import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import ComingSoon from "../../pages/shared/ComingSoon.tsx";

const stockBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.REPORT_SALES,
        path: '/inventory/stock/',
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

const StockRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Inventory Stock'}</PageTitle>
                    <ComingSoon/>
                </SuspenseView>
            }/>
        </Routes>
    )
}

export default StockRoutes;