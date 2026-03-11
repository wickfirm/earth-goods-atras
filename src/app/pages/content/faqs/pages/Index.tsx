import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {FaqsColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import {EXPORT_ENDPOINT, getFaqs} from "../../../../requests/content/Faq.ts";
import FaqIndexFilter from "../partials/IndexFilter.tsx";

const FaqIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_FAQS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.CONTENT_FAQS_LIST}
                   requestFunction={getFaqs}
                   columnsArray={FaqsColumns}
                   cardHeader={
                       {
                           text: 'All Faqs',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('faqs-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/content/faqs', 'manage-content')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={FaqIndexFilter}
                   ktCardHeaderClasses={'border-0'}
        />
    )
}

export default FaqIndex;
