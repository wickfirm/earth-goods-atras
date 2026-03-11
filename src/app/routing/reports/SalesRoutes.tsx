import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import ComingSoon from "../../pages/shared/ComingSoon.tsx";
import SalesReport from "../../pages/sales/pages/SalesReport.tsx";

const salesReportBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.REPORT_SALES,
        path: '/reports/sales/',
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

const SalesRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Sales Report'}</PageTitle>

                    <SalesReport/>
                </SuspenseView>
            }/>
        </Routes>
    )
}

export default SalesRoutes;