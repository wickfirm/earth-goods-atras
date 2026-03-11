import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const EngagementModuleRoutes: React.FC = () => {
    const ReviewRoutes = lazy(() => import('../engagement/ReviewRoutes.tsx'));
    const SubscriptionRoutes = lazy(() => import('../engagement/SubscriptionRoutes.tsx'));
    const GetCodeSubmissionRoutes = lazy(() => import('../engagement/GetCodeSubmissionRoutes.tsx'));
    const ContactSubmissionRoutes = lazy(() => import('../engagement/ContactSubmissionRoutes.tsx'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='reviews/*'
                element={
                    <SuspenseView>
                        <ReviewRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='subscriptions/*'
                element={
                    <SuspenseView>
                        <SubscriptionRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='get-code-submissions/*'
                element={
                    <SuspenseView>
                        <GetCodeSubmissionRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='contact-submissions/*'
                element={
                    <SuspenseView>
                        <ContactSubmissionRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default EngagementModuleRoutes;