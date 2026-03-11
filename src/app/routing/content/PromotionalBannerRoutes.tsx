import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import {Sections} from '../../helpers/sections';
import BannerCreate from "../../pages/content/banners/pages/Create.tsx";
import BannerIndex from "../../pages/content/banners/pages/Index.tsx";
import BannerEdit from "../../pages/content/banners/pages/Edit.tsx";

const promotionalBannersBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_PROMOTIONAL_BANNERS,
        path: '/content/promotional-banners/',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const PromotionalBannerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Promotional Banners'}</PageTitle>
                    <BannerIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={promotionalBannersBreadcrumbs}
                                   showPageTitle={false}>{'Create'}</PageTitle>
                        <BannerCreate/>
                    </SuspenseView>
                }
            />

            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={promotionalBannersBreadcrumbs}
                                   showPageTitle={false}>{'Edit'}</PageTitle>
                        <BannerEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PromotionalBannerRoutes;
