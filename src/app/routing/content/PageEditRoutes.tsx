import {Route, Routes, useNavigate, useParams} from 'react-router-dom'
import React, {useEffect} from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView.tsx'
import {Sections} from '../../helpers/sections.ts';
import HomePageEdit from "../../pages/content/site/pages/pages/HomePageEdit.tsx";
import {getErrorPage, submitRequest} from "../../helpers/requests.ts";
import {getPage} from "../../requests/content/site/Page.ts";
import {usePageEdit} from "../../pages/content/site/pages/core/PageEditContext.loader.tsx";
import OurStoryPageEdit from "../../pages/content/site/pages/pages/OurStoryPageEdit.tsx";

const PageEditRoutes: React.FC = () => {
    const {setPage, refresh} = usePageEdit()

    const {id} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            submitRequest(getPage, [parseInt(id)], (response) => {
                const errorPage = getErrorPage(response)

                if (errorPage) {
                    navigate(errorPage)
                } else {
                    setPage(response)
                }
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, refresh])

    const breadcrumbs: Array<PageLink> = [
        {
            title: Sections.CONTENT_SITE,
            path: '/content/site/pages/',
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

    return (
        <Routes>
            <Route
                path='/edit'
                element={
                    <SuspenseView>
                        {
                            id && id === '1' ?
                                <>
                                    <PageTitle breadcrumbs={breadcrumbs}
                                               showPageTitle={false}>{'Home Page Edit'}</PageTitle>
                                    <HomePageEdit/>
                                </>
                                :
                                id === '2' ?
                                    <>
                                        <PageTitle breadcrumbs={breadcrumbs}
                                                   showPageTitle={false}>{'Our Story Edit'}</PageTitle>
                                        <OurStoryPageEdit/>
                                    </>
                                    :
                                    <>
                                        <PageTitle breadcrumbs={breadcrumbs}
                                                   showPageTitle={false}>{'Page Edit'}</PageTitle>
                                    </>
                        }
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default PageEditRoutes;
