import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';
import BulkDiscount from "../../pages/commerce/discount/pages/BulkDiscount.tsx";

const CommerceModuleRoutes: React.FC = () => {
    const ProductRoutes = lazy(() => import('../commerce/ProductRoutes.tsx'));
    const CategoryRoutes = lazy(() => import('../commerce/CategoryRoutes.tsx'));
    const TagRoutes = lazy(() => import('../commerce/TagRoutes.tsx'));
    const ClaimRoutes = lazy(() => import('../commerce/ClaimRoutes.tsx'));
    const IngredientRoutes = lazy(() => import('../commerce/IngredientRoutes.tsx'));
    const LifestyleRoutes = lazy(() => import('../commerce/LifestyleRoutes.tsx'));
    const NutritionalAttributeRoutes = lazy(() => import('../commerce/NutritionalAttributeRoutes.tsx'));
    const HighlightRoutes = lazy(() => import('../commerce/HighlightRoutes.tsx'));
    const OrderRoutes = lazy(() => import('../commerce/OrderRoutes.tsx'));
    const CustomerRoutes = lazy(() => import('../commerce/CustomerRoutes.tsx'));
    const DiscountCodeRoutes = lazy(() => import('../commerce/DiscountCodeRoutes.tsx'));
    const DiscountRoutes = lazy(() => import('../commerce/DiscountRoutes.tsx'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='products/*'
                element={
                    <SuspenseView>
                        <ProductRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='categories/*'
                element={
                    <SuspenseView>
                        <CategoryRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='tags/*'
                element={
                    <SuspenseView>
                        <TagRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='claims/*'
                element={
                    <SuspenseView>
                        <ClaimRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='ingredients/*'
                element={
                    <SuspenseView>
                        <IngredientRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='lifestyles/*'
                element={
                    <SuspenseView>
                        <LifestyleRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='nutritional-attributes/*'
                element={
                    <SuspenseView>
                        <NutritionalAttributeRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='highlights/*'
                element={
                    <SuspenseView>
                        <HighlightRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='orders/*'
                element={
                    <SuspenseView>
                        <OrderRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='customers/*'
                element={
                    <SuspenseView>
                        <CustomerRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='discount-codes/*'
                element={
                    <SuspenseView>
                        <DiscountCodeRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='discount/*'
                element={
                    <SuspenseView>
                        <DiscountRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default CommerceModuleRoutes;