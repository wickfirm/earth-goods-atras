import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {SuspenseView} from '../../components/misc/SuspenseView';

const ContentModuleRoutes: React.FC = () => {
    const SiteRoutes = lazy(() => import('../content/SiteRoutes.tsx'));
    const RecipeRoutes = lazy(() => import('../content/RecipeRoutes.tsx'));
    const BlogRoutes = lazy(() => import('../content/BlogRoutes.tsx'));
    const FaqRoutes = lazy(() => import('../content/FaqRoutes.tsx'));
    const PromotionalBannerRoutes = lazy(() => import('../content/PromotionalBannerRoutes.tsx'));
    const CustomerReviewRoutes = lazy(() => import('../content/CustomerReviewRoutes.tsx'));
    const NewsletterRoutes = lazy(() => import('../content/NewsletterRoutes.tsx'));
    const PolicyRoutes = lazy(() => import('../content/PolicyRoutes.tsx'));

    return (
        <Routes>
            {/* Sections */}
            <Route
                path='site/*'
                element={
                    <SuspenseView>
                        <SiteRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='recipes/*'
                element={
                    <SuspenseView>
                        <RecipeRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='blogs/*'
                element={
                    <SuspenseView>
                        <BlogRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='faqs/*'
                element={
                    <SuspenseView>
                        <FaqRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='banners/*'
                element={
                    <SuspenseView>
                        <PromotionalBannerRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='customer-reviews/*'
                element={
                    <SuspenseView>
                        <CustomerReviewRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='newsletters/*'
                element={
                    <SuspenseView>
                        <NewsletterRoutes/>
                    </SuspenseView>
                }
            ></Route>

            <Route
                path='policies/*'
                element={
                    <SuspenseView>
                        <PolicyRoutes/>
                    </SuspenseView>
                }
            ></Route>
        </Routes>
    )
}

export default ContentModuleRoutes;