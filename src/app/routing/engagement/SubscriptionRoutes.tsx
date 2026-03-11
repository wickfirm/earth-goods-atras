import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import SubscriptionIndex from '../../pages/engagement/subscriptions/pages/Index';

const SubscriptionRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Newsletter Subscriptions'}</PageTitle>
                    <SubscriptionIndex/>
                </SuspenseView>
            }/>
        </Routes>
    )
}

export default SubscriptionRoutes;
