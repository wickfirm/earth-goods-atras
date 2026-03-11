import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {BlogsColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import {EXPORT_ENDPOINT, getBlogs} from "../../../../requests/content/Blog.ts";
import BlogIndexFilter from "../partials/IndexFilter.tsx";

const BlogIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_BLOGS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.CONTENT_BLOGS_LIST}
                   requestFunction={getBlogs}
                   columnsArray={BlogsColumns}
                   cardHeader={
                       {
                           text: 'All Blogs',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('blogs-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/content/blogs', 'manage-content')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={BlogIndexFilter}
                   ktCardHeaderClasses={'border-0'}
        />
    )
}

export default BlogIndex;
