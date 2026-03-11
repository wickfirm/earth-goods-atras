import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import NewsletterIndex from "../../pages/content/newsletter/pages/Index.tsx";

const NewsletterRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Newsletter Popup'}</PageTitle>
                    <NewsletterIndex/>
                </SuspenseView>
            }/>
        </Routes>
    )
}

export default NewsletterRoutes;
