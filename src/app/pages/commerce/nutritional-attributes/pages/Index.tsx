import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getNutritionalAttributes} from '../../../../requests/commerce/NutritionalAttribute.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {NutritionalAttributesColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import NutritionalAttributeIndexFilter from "../partials/IndexFilter.tsx";

const NutritionalAttributeIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_NUTRITIONAL_ATTRIBUTES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.TAGS_LIST}
                   requestFunction={getNutritionalAttributes}
                   columnsArray={NutritionalAttributesColumns}
                   cardHeader={
                       {
                           text: 'All Nutritional Attributes',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('nutritional-attributes-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/commerce/nutritional-attributes', 'manage-commerce')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={NutritionalAttributeIndexFilter}
        />
    )
}

export default NutritionalAttributeIndex;
