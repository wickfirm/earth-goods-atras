import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {
    AddBulkCardAction,
    CreateCardAction,
    ExportCardAction,
    FilterCardAction
} from "../../../../components/misc/CardAction.tsx";
import {ProductsColumns} from "../core/TableColumns.tsx";
import {EXPORT_ENDPOINT, EXPORT_GENERAL_ENDPOINT, getProducts} from "../../../../requests/commerce/Product.ts";
import ProductIndexFilter from "../partials/IndexFilter.tsx";

const ProductIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_PRODUCTS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.PRODUCTS_LIST}
                   requestFunction={getProducts}
                   columnsArray={ProductsColumns}
                   cardHeader={
                       {
                           text: 'All Products',
                           actions: [new ExportCardAction(exportQuery, EXPORT_GENERAL_ENDPOINT),
                               new FilterCardAction('products-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/commerce/products', 'manage-commerce'),
                               new AddBulkCardAction('/commerce/products/bulk', 'manage-commerce')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={ProductIndexFilter}
        />
    )
}

export default ProductIndex;
