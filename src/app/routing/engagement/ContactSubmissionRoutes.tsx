import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import ContactSubmissionIndex from "../../pages/engagement/contact-submissions/pages/Index.tsx";

const ContactSubmissionRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Contact Submissions'}</PageTitle>
                    <ContactSubmissionIndex/>
                </SuspenseView>
            }/>
        </Routes>
    )
}

export default ContactSubmissionRoutes;
