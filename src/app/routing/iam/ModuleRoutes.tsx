import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const IamModuleRoutes: React.FC = () => {
    const PermissionRoutes = lazy(() => import('./PermissionRoutes'));
    const RoleRoutes = lazy(() => import('./RoleRoutes'));
    const UserRoutes = lazy(() => import('./UserRoutes'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='permissions/*'
                element={
                    <SuspenseView>
                        <PermissionRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='roles/*'
                element={
                    <SuspenseView>
                        <RoleRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='users/*'
                element={
                    <SuspenseView>
                        <UserRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default IamModuleRoutes;