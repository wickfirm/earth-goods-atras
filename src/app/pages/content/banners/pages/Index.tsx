import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {BannersColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import {EXPORT_ENDPOINT, getBanners} from "../../../../requests/content/Banner.ts";
import BannerIndexFilter from "../partials/IndexFilter.tsx";

const BannerIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_PROMOTIONAL_BANNERS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.CONTENT_PROMOTIONAL_BANNERS_LIST}
                   requestFunction={getBanners}
                   columnsArray={BannersColumns}
                   cardHeader={
                       {
                           text: 'All Banners',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('banners-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/content/banners', 'manage-content')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={BannerIndexFilter}
                   ktCardHeaderClasses={'border-0'}
        />
    )
}

export default BannerIndex;
