import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {SubscriptionsColumns} from "../core/TableColumns.tsx";
import {ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import SubscriptionIndexFilter from "../partials/IndexFilter.tsx";
import {EXPORT_ENDPOINT, getSubscriptions} from "../../../../requests/engagement/Subscription.ts";

const SubscriptionIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.ENGAGEMENT_SUBSCRIPTIONS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.ENGAGEMENT_SUBSCRIPTIONS_LIST}
                   requestFunction={getSubscriptions}
                   columnsArray={SubscriptionsColumns}
                   cardHeader={
                       {
                           text: 'All Subscriptions',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('subscriptions-list-filter', showFilter, setShowFilter)],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={SubscriptionIndexFilter}
        />
    )
}

export default SubscriptionIndex;
