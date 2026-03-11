import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getDiscountCodes} from '../../../../requests/commerce/DiscountCode.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {DiscountCodesColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import DiscountCodeIndexFilter from "../partials/IndexFilter.tsx";

const DiscountCodeIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_DISCOUNT_CODES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.DISCOUNT_CODES_LIST}
                   requestFunction={getDiscountCodes}
                   columnsArray={DiscountCodesColumns}
                   cardHeader={
                       {
                           text: 'All DiscountCodes',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('discount-codes-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/commerce/discount-codes', 'manage-commerce')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={DiscountCodeIndexFilter}
        />
    )
}

export default DiscountCodeIndex;
