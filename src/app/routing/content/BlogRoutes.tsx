import {Route, Routes} from 'react-router-dom'
import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {SuspenseView} from '../../components/misc/SuspenseView'
import BlogIndex from '../../pages/content/blogs/pages/Index';
import BlogCreate from '../../pages/content/blogs/pages/Create';
import BlogEdit from '../../pages/content/blogs/pages/Edit';
import {Sections} from '../../helpers/sections';

const blogsBreadcrumbs: Array<PageLink> = [
    {
        title: Sections.CONTENT_BLOGS,
        path: '/content/blogs/',
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

const BlogRoutes: React.FC = () => {
    return (
        <Routes>
            <Route index element={
                <SuspenseView>
                    <PageTitle breadcrumbs={[]}>{'Blogs'}</PageTitle>
                    <BlogIndex/>
                </SuspenseView>
            }/>

            <Route
                path='/create'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={blogsBreadcrumbs} showPageTitle={false}>{'Create'}</PageTitle>
                        <BlogCreate/>
                    </SuspenseView>
                }
            />
            <Route
                path='/:id/edit'
                element={
                    <SuspenseView>
                        <PageTitle breadcrumbs={blogsBreadcrumbs} showPageTitle={false}>{'Edit'}</PageTitle>
                        <BlogEdit/>
                    </SuspenseView>
                }
            />
        </Routes>
    )
}

export default BlogRoutes;
