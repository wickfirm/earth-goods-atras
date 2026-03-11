import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const ReportsModuleRoutes: React.FC = () => {
    const SalesRoutes = lazy(() => import('../reports/SalesRoutes.tsx'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='sales/*'
                element={
                    <SuspenseView>
                        <SalesRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default ReportsModuleRoutes;