import React, {lazy, useEffect, useMemo, useState} from 'react'
import {useWickApp} from "../../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../../../helpers/sections.ts";
import {PageTypes} from "../../../../../helpers/variables.ts";
import {KTCard, KTCardBody} from '../../../../../../_metronic/helpers';
import {KTCardHeader} from "../../../../../../_metronic/helpers/components/KTCardHeader.tsx";
import {Nav, Tab} from 'react-bootstrap';
import {usePageEdit} from "../core/PageEditContext.loader.tsx";
import {useNavigate} from "react-router-dom";
import {getErrorPage, submitRequest} from "../../../../../helpers/requests.ts";
import {getProductOptions} from "../../../../../requests/Options.ts";
import {getAllProducts} from "../../../../../requests/commerce/Product.ts";
import {Section} from "../../../../../models/content/Site.ts";
import {getSections} from "../../../../../requests/content/site/Section.ts";

// Lazy load sections to improve performance
const HeroSection = lazy(() => import('../partials/our-story-page/HeroSection.tsx'));
const AboutSection = lazy(() => import('../partials/our-story-page/AboutSection.tsx'));
const MapSection = lazy(() => import('../partials/our-story-page/MapSection.tsx'));

// Memoize settingsNav to prevent re-rendering
const settingsNav = [
    {
        id: 1,
        title: "Hero",
        description: "Customize the hero section",
        icon: "fa fa-photo-video",
    },
    {
        id: 2,
        title: "About",
        description: "Manage the about section content and images",
        icon: "fa fa-info-circle",
    },
    {
        id: 3,
        title: "Map",
        description: "Configure the interactive map content",
        icon: "fa fa-map-marker-alt",
    },
];

const OurStoryPageEdit = () => {
    const {page} = usePageEdit();
    const wickApp = useWickApp();
    const navigate = useNavigate()

    const [sections, setSections] = useState<Section[]>([])
    const [heroSection, setHeroSection] = useState<Section | null>()
    const [aboutSection, setAboutSection] = useState<Section | null>()
    const [mapSection, setMapSection] = useState<Section | null>()

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_SITE, PageTypes.INDEX));
    }, [wickApp]);

    useEffect(() => {
        submitRequest(getSections, [2], (response) => {
            const errorPage = getErrorPage(response)

            if (errorPage) {
                navigate(errorPage)
            } else {
                setSections(response.data)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setHeroSection(sections.find((section) => section.type.id === 'hero'))
        setAboutSection(sections.find((section) => section.type.id === 'story'))
        setMapSection(sections.find((section) => section.type.id === 'map'))
    }, [sections]);

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
                                            {index === 0 && heroSection &&
                                                <HeroSection sectionId={heroSection.id} pageId={page.id}/>}
                                            {index === 1 && aboutSection &&
                                                <AboutSection sectionId={aboutSection.id} pageId={page.id}/>}
                                            {index === 2 && mapSection &&
                                            <MapSection sectionId={mapSection.id} pageId={page.id}/>}
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

export default OurStoryPageEdit;