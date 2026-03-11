import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {CustomerReviewsColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import {EXPORT_ENDPOINT, getCustomerReviews} from "../../../../requests/content/CustomerReview.ts";
import CustomerReviewIndexFilter from "../partials/IndexFilter.tsx";

const CustomerReviewIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_CUSTOMER_REVIEWS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.CONTENT_CUSTOMER_REVIEWS_LIST}
                   requestFunction={getCustomerReviews}
                   columnsArray={CustomerReviewsColumns}
                   cardHeader={
                       {
                           text: 'All Customer Reviews',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('customer-reviews-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/content/customer-reviews', 'manage-content')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={CustomerReviewIndexFilter}
                   ktCardHeaderClasses={'border-0'}
        />
    )
}

export default CustomerReviewIndex;
