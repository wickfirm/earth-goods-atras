import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getCategories} from '../../../../requests/commerce/Category.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {CategoriesColumns} from "../core/TableColumns.tsx";
import {
    CreateCardAction,
    ExportCardAction,
    FilterCardAction,
    ReorderCardAction
} from "../../../../components/misc/CardAction.tsx";
import CategoryIndexFilter from "../partials/IndexFilter.tsx";

const CategoryIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_CATEGORIES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.CATEGORIES_LIST}
                   requestFunction={getCategories}
                   columnsArray={CategoriesColumns}
                   cardHeader={
                       {
                           text: 'All Categories',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('categories-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/commerce/categories', 'manage-commerce'),
                               new ReorderCardAction('/commerce/categories/reorder', 'manage-commerce')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={CategoryIndexFilter}
                   ktCardHeaderClasses={'border-0'}
        />
    )
}

export default CategoryIndex;
