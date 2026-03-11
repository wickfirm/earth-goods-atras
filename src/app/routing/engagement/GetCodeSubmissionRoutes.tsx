import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import GetCodeSubmissionIndex from "../../pages/engagement/get-code-submissions/pages/Index.tsx";

const GetCodeSubmissionRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Get Code Submissions'}</PageTitle>
                    <GetCodeSubmissionIndex/>
                </SuspenseView>
            }/>
        </Routes>
    )
}

export default GetCodeSubmissionRoutes;
