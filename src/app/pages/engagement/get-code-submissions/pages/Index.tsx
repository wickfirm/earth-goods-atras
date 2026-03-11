import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {GetCodeSubmissionsColumns} from "../core/TableColumns.tsx";
import {ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import GetCodeSubmissionIndexFilter from "../partials/IndexFilter.tsx";
import {EXPORT_ENDPOINT} from "../../../../requests/engagement/Subscription.ts";
import {getGetCodeSubmissions} from "../../../../requests/engagement/GetCodeSubmission.ts";

const GetCodeSubmissionIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.ENGAGEMENT_GET_CODE_SUBMISSIONS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.ENGAGEMENT_GET_CODE_SUBMISSIONS_LIST}
                   requestFunction={getGetCodeSubmissions}
                   columnsArray={GetCodeSubmissionsColumns}
                   cardHeader={
                       {
                           text: 'All Submissions',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('get-code-submissions-list-filter', showFilter, setShowFilter)],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={GetCodeSubmissionIndexFilter}
        />
    )
}

export default GetCodeSubmissionIndex;
