import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {ReviewsColumns} from "../core/TableColumns.tsx";
import {ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import ReviewIndexFilter from "../partials/IndexFilter.tsx";
import {EXPORT_ENDPOINT, getReviews} from "../../../../requests/engagement/Review.ts";

const ReviewIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.ENGAGEMENT_REVIEWS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.ENGAGEMENT_REVIEWS_LIST}
                   requestFunction={getReviews}
                   columnsArray={ReviewsColumns}
                   cardHeader={
                       {
                           text: 'All Reviews',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('reviews-list-filter', showFilter, setShowFilter)],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={ReviewIndexFilter}
        />
    )
}

export default ReviewIndex;
