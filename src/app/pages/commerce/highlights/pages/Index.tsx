import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getAllHighlights, getHighlights} from '../../../../requests/commerce/Highlight.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {HighlightsColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import HighlightIndexFilter from "../partials/IndexFilter.tsx";
import {getErrorPage, submitRequest} from "../../../../helpers/requests.ts";
import {useNavigate} from "react-router-dom";
import WickAlert from "../../../../components/alerts/WickAlert.tsx";

type CardAction = ExportCardAction | FilterCardAction | CreateCardAction;

const HighlightIndex = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate()

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_HIGHLIGHT, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const initialCardHeaderActions: CardAction[] = [
        new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
        new FilterCardAction('highlights-list-filter', showFilter, setShowFilter),
    ];

    const [cardHeaderActions, setCardHeaderActions] = useState<CardAction[]>(initialCardHeaderActions);

    useEffect(() => {
        submitRequest(getAllHighlights, [], (response) => {
            const errorPage = getErrorPage(response);

            if (errorPage) {
                navigate(errorPage);
            } else {
                if (response.length < 5) {
                    setCardHeaderActions([
                        ...initialCardHeaderActions,
                        new CreateCardAction('/commerce/highlights', 'manage-commerce')
                    ]);
                }
            }
        });
    }, []);

    return (
        <>
            <WickAlert
                icon='fa-triangle-exclamation'
                color='warning'
                title='Reminder!'
                message={'You can add a maximum of 5 highlights. Additional highlights cannot be added.'}
            />

            <WickIndex queryId={QUERIES.CLAIMS_LIST}
                       requestFunction={getHighlights}
                       columnsArray={HighlightsColumns}
                       cardHeader={
                           {
                               text: 'All Highlights',
                               actions: cardHeaderActions,
                           }}
                       showFilter={showFilter}
                       setExportQuery={setExportQuery}
                       FilterComponent={HighlightIndexFilter}
            />
        </>
    )
}

export default HighlightIndex;
