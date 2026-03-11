import React, {lazy, useEffect, useMemo} from 'react'
import {useWickApp} from "../../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../../../helpers/sections.ts";
import {PageTypes} from "../../../../../helpers/variables.ts";
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {Nav, Tab} from 'react-bootstrap';
import {usePageEdit} from "../core/PageEditContext.loader.tsx";
import {useNavigate} from "react-router-dom";

// Lazy load sections to improve performance
const HeaderBannerSection = lazy(() => import('../partials/header-banner/HeaderBannerSection.tsx'));
const HeroSection = lazy(() => import('../partials/hero/HeroSection.tsx'));
const CategoriesSection = lazy(() => import('../partials/categories/CategoriesSection.tsx'));
const PromotionalStripSection = lazy(() => import('../partials/promotional-strip/PromotionalStripSection.tsx'));
const ProductsSection = lazy(() => import('../partials/products/ProductsSection.tsx'));
const CustomerReviewsSection = lazy(() => import('../partials/customer-reviews/CustomerReviewsSection.tsx'));
const NewsletterSection = lazy(() => import('../partials/newsletter/NewsletterSection.tsx'));
const RecipesSection = lazy(() => import('../partials/recipes/RecipesSection.tsx'));
const StorySection = lazy(() => import('../partials/story/StorySection.tsx'));
const NewsSection = lazy(() => import('../partials/news/NewsSection.tsx'));
const PromotionalBannerSection = lazy(() => import('../partials/promotional-banner/PromotionalBannerSection.tsx'));
const ReassuranceStripSection = lazy(() => import('../partials/reassurance-strip/ReassuranceStripSection.tsx'));

// Memoize settingsNav to prevent re-rendering
const settingsNav = [
    {
        id: 1,
        title: "Top Promotional Strip",
        description: "Configure and manage the settings for the top promotional strip",
        icon: "fa fa-sliders-h",
    },
    {
        id: 2,
        title: "Hero",
        description: "Customize hero block",
        icon: "fa fa-photo-video",
    },
    {
        id: 3,
        title: "Categories",
        description: "Configure the settings for categories block",
        icon: "fa fa-tags",
    },
    {
        id: 4,
        title: "Claims Strip",
        description: "Update claims highlights",
        icon: "fa fa-bullhorn",
    },
    {
        id: 5,
        title: "Products",
        description: "Adjust the settings for products block",
        icon: "fa fa-box-open",
    },
    {
        id: 6,
        title: "Customer Reviews",
        description: "Configure the settings for customer reviews block",
        icon: "fa fa-comments",
    },
    {
        id: 7,
        title: "Newsletter",
        description: "Customize the newsletter block",
        icon: "fa fa-envelope-open-text",
    },
    {
        id: 8,
        title: "Recipes",
        description: "Adjust the settings for recipes block",
        icon: "fa fa-utensils",
    },
    {
        id: 9,
        title: "Story",
        description: "Craft brand storytelling",
        icon: "fa fa-feather-alt",
    },
    {
        id: 10,
        title: "News",
        description: "Manage the settings for the news block",
        icon: "fa fa-bullhorn",
    },
    {
        id: 11,
        title: "Promotional Banner",
        description: "Revise banner details",
        icon: "fa fa-flag",
    },
    {
        id: 12,
        title: "Reassurance Strip",
        description: "Enhance trust badges",
        icon: "fa fa-shield-alt",
    },
];

const HomePageEdit = () => {
    const {page} = usePageEdit();
    console.log(page)
    const wickApp = useWickApp();
    const navigate = useNavigate()

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_SITE, PageTypes.INDEX));
    }, [wickApp]);

    const memoizedNavItems = useMemo(() => settingsNav, []);

    return (
        <KTCard className='mb-5'>
            <KTCardHeader text='Edit Sections'/>

            <KTCardBody>
                <Tab.Container defaultActiveKey='settingsNav-0'>
                    <div className='row'>
                        <div className='col-lg-4 col-xl-3'>
                            <Nav variant='pills' className='flex-column settings-nav'>
                                {memoizedNavItems.map((settings, index) => (
                                    <Nav.Item key={`settings-nav-${index}`} className='mb-5'>
                                        <Nav.Link
                                            className='settings-nav-item'
                                            eventKey={`settingsNav-${index}`}
                                        >
                                            <div className='settings-nav-icon w-25px h-25px bg-transparent'>
                                                <i className={`${settings.icon}`}></i>
                                            </div>
                                            <div className='settings-nav-label'>
                                                <span
                                                    className='settings-nav-title text-gray-800'>{settings.title}</span>
                                                <span className='settings-nav-desc text-gray-500'>
                                                    {settings.description}
                                                </span>
                                            </div>
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        </div>
                        <div className='col-lg-8 col-xl-9'>
                            {page && (
                                <Tab.Content>
                                    {memoizedNavItems.map((settings, index) => (
                                        <Tab.Pane key={`pane-${index}`} eventKey={`settingsNav-${index}`}>
                                            {index === 0 && <HeaderBannerSection sectionId={1} pageId={page.id}/>}
                                            {index === 1 && <HeroSection sectionId={2} pageId={page.id}/>}
                                            {index === 2 && <CategoriesSection sectionId={3} pageId={page.id}/>}
                                            {index === 3 &&
                                                <PromotionalStripSection sectionId={4} pageId={page.id}/>}
                                            {index === 4 && <ProductsSection sectionId={5} pageId={page.id}/>}
                                            {index === 5 &&
                                                <CustomerReviewsSection sectionId={6} pageId={page.id}/>}
                                            {index === 6 && <NewsletterSection sectionId={7} pageId={page.id}/>}
                                            {index === 7 && <RecipesSection sectionId={8} pageId={page.id}/>}
                                            {index === 8 && <StorySection sectionId={9} pageId={page.id}/>}
                                            {index === 9 && <NewsSection sectionId={10} pageId={page.id}/>}
                                            {index === 10 &&
                                                <PromotionalBannerSection sectionId={11} pageId={page.id}/>}
                                            {index === 11 &&
                                                <ReassuranceStripSection sectionId={12} pageId={page.id}/>}
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            )}
                        </div>
                    </div>
                </Tab.Container>
            </KTCardBody>
        </KTCard>
    );
}

export default HomePageEdit;