import {Route, Routes} from 'react-router-dom'
import React, {lazy} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import {PageProvider} from "../../pages/content/site/pages/core/PageContext.tsx";

const siteBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_SITE,
        path: '/content/site',
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

const SiteRoutes: React.FC = () => {
    const PagesRoutes = lazy(() => import('./PageRoutes'))

    return (
        <PageProvider>
            <Routes>
                <Route
                    path='/pages/*'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={siteBreadcrumbs}
                                       showPageTitle={false}>{'Pages'}</PageTitle>
                            <PagesRoutes/>
                        </SuspenseView>
                    }
                />
            </Routes>
        </PageProvider>
    )
}

export default SiteRoutes;
