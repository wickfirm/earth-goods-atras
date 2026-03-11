import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {ContactSubmissionsColumns} from "../core/TableColumns.tsx";
import {ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import ContactSubmissionIndexFilter from "../partials/IndexFilter.tsx";
import {EXPORT_ENDPOINT, getContactSubmissions} from "../../../../requests/engagement/ContactSubmission.ts";

const ContactSubmissionIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.ENGAGEMENT_CONTACT_SUBMISSIONS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.ENGAGEMENT_CONTACT_SUBMISSIONS_LIST}
                   requestFunction={getContactSubmissions}
                   columnsArray={ContactSubmissionsColumns}
                   cardHeader={
                       {
                           text: 'All Contact Submissions',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('contact-submissions-list-filter', showFilter, setShowFilter)],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={ContactSubmissionIndexFilter}
        />
    )
}

export default ContactSubmissionIndex;
