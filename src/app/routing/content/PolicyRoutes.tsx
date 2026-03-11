import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
// import PolicyCreate from '../../pages/content/policies/pages/Create';
// import PolicyEdit from '../../pages/content/policies/pages/Edit';
import {Sections} from '../../helpers/sections';
import PrivacyPolicy from "../../pages/content/policies/pages/PrivacyPolicy.tsx";
import TermsConditions from "../../pages/content/policies/pages/TermsConditions.tsx";

const policiesBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_POLICY,
        path: '/content/policies/',
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

const PolicyRoutes: React.FC = () => {
    return (
        <Routes>
            <Route
                path='/privacy-policy'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={policiesBreadcrumbs} showPageTitle={false}>{'Privacy Policy'}</PageTitle>
                        <PrivacyPolicy/>
                    </SuspenseView>
                }
            />
            <Route
                path='/terms-and-conditions'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={policiesBreadcrumbs} showPageTitle={false}>{'Terms & Conditions'}</PageTitle>
                        <TermsConditions/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PolicyRoutes;
