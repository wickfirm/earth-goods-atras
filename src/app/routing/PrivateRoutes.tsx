import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import IamModuleRoutes from "./iam/ModuleRoutes.tsx";
import MiscModuleRoutes from "./misc/ModuleRoutes.tsx";
import CommerceModuleRoutes from "./commerce/ModuleRoutes.tsx";
import ContentModuleRoutes from "./content/ModuleRoutes.tsx";
import {MainProvider} from "../pages/shared/MainContext.tsx";
import ReportsModuleRoutes from "./reports/ModuleRoutes.tsx";
import InventoryModuleRoutes from "./inventory/ModuleRoutes.tsx";
import EngagementModuleRoutes from "./engagement/ModuleRoutes.tsx";
import {Profile} from "../pages/iam/users/pages/Profile.tsx";

const PrivateRoutes = () => {
    // NOTE: I commented out this lazy line of code because if the user refreshes the page at these routes,
    // it causes an infinite loop.
    // const IamModuleRoutes = lazy(() => import('./iam/ModuleRoutes'));

    return (
        <MainProvider>
            <Routes>
                <Route element={<MasterLayout/>}>
                    <Route path='auth/*' element={<Navigate to='/dashboard'/>}/>

                    {/* Pages */}
                    <Route path='dashboard' element={<DashboardWrapper/>}/>

                    <Route path='profile' element={<Profile/>}/>

                    {/* Lazy Modules */}
                    <Route path='iam/*' element={<IamModuleRoutes/>}/>
                    <Route path='misc/*' element={<MiscModuleRoutes/>}/>
                    <Route path='commerce/*' element={<CommerceModuleRoutes/>}/>
                    <Route path='content/*' element={<ContentModuleRoutes/>}/>
                    <Route path='reports/*' element={<ReportsModuleRoutes/>}/>
                    <Route path='inventory/*' element={<InventoryModuleRoutes/>}/>
                    <Route path='engagement/*' element={<EngagementModuleRoutes/>}/>

                    {/* Page Not Found */}
                    <Route path='*' element={<Navigate to='/error/404'/>}/>
                </Route>
            </Routes>
        </MainProvider>
    )
}

export default PrivateRoutes;
