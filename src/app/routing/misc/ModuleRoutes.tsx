import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const MiscModuleRoutes: React.FC = () => {
    const CountryRoutes = lazy(() => import('./CountryRoutes.tsx'));
    const CityRoutes = lazy(() => import('./CityRoutes.tsx'));
    const PaymentMethodRoutes = lazy(() => import('./PaymentMethodRoutes.tsx'));
    const CollectionRoutes = lazy(() => import('./CollectionRoutes.tsx'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='countries/*'
                element={
                    <SuspenseView>
                        <CountryRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='cities/*'
                element={
                    <SuspenseView>
                        <CityRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='payment-methods/*'
                element={
                    <SuspenseView>
                        <PaymentMethodRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='collections/*'
                element={
                    <SuspenseView>
                        <CollectionRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default MiscModuleRoutes;