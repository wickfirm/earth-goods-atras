import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getIngredients} from '../../../../requests/commerce/Ingredient.ts';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {IngredientsColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import IngredientIndexFilter from "../partials/IndexFilter.tsx";

const IngredientIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.COMMERCE_INGREDIENTS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.INGREDIENTS_LIST}
                   requestFunction={getIngredients}
                   columnsArray={IngredientsColumns}
                   cardHeader={
                       {
                           text: 'All Ingredients',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('ingredients-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/commerce/ingredients', 'manage-commerce')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={IngredientIndexFilter}
        />
    )
}

export default IngredientIndex;
