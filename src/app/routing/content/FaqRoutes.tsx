import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import FaqIndex from '../../pages/content/faqs/pages/Index';
import FaqCreate from '../../pages/content/faqs/pages/Create';
import FaqEdit from '../../pages/content/faqs/pages/Edit';
import {Sections} from '../../helpers/sections';
import FaqReorder from "../../pages/content/faqs/pages/Reorder.tsx";

const faqsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_FAQS,
        path: '/content/faqs/',
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

const FaqRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Faqs'}</PageTitle>
                    <FaqIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/reorder'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={faqsBreadcrumbs} showPageTitle={false}>{'Reorder'}</PageTitle>
                        <FaqReorder/>
                    </SuspenseView>
                }
            />

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={faqsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <FaqCreate/>
                    </SuspenseView>
                }
            />

            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={faqsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <FaqEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default FaqRoutes;
