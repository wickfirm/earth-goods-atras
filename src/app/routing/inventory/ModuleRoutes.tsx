import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const InventoryModuleRoutes: React.FC = () => {
    const StockRoutes = lazy(() => import('../inventory/StockRoutes.tsx'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='stock/*'
                element={
                    <SuspenseView>
                        <StockRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default InventoryModuleRoutes;