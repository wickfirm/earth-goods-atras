import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import {PageProvider} from "../../pages/content/site/pages/core/PageContext.tsx";
import PageEditRoutes from "./PageEditRoutes.tsx";
import {PageEditProvider} from "../../pages/content/site/pages/core/PageEditContext.tsx";

const siteBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_SITE,
        path: '/content/site/pages',
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

const PageRoutes: React.FC = () => {
    return (
        <PageProvider>
            <Routes>
                <Route
                    path='/:id/*'
                    element={
                        <SuspenseView>
                            <PageTitle breadcrumbs={siteBreadcrumbs}
                                       showPageTitle={false}>{'---'}</PageTitle>
                            <PageEditProvider>
                                <PageEditRoutes/>
                            </PageEditProvider>
                        </SuspenseView>
                    }
                />
            </Routes>
        </PageProvider>
    )
}

export default PageRoutes;