import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getLifestyles} from '../../../../requests/commerce/Lifestyle.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {LifestylesColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import LifestyleIndexFilter from "../partials/IndexFilter.tsx";

const LifestyleIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_LIFESTYLE, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.LIFESTYLE_LIST}
                   requestFunction={getLifestyles}
                   columnsArray={LifestylesColumns}
                   cardHeader={
                       {
                           text: 'All Lifestyles',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('lifestyles-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/commerce/lifestyles', 'manage-commerce')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={LifestyleIndexFilter}
        />
    )
}

export default LifestyleIndex;
