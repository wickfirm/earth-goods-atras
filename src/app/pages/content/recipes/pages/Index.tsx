import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {RecipesColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import {EXPORT_ENDPOINT, getRecipes} from "../../../../requests/content/Recipe.ts";
import RecipeIndexFilter from "../partials/IndexFilter.tsx";

const RecipeIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_RECIPES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.CONTENT_RECIPES_LIST}
                   requestFunction={getRecipes}
                   columnsArray={RecipesColumns}
                   cardHeader={
                       {
                           text: 'All Recipes',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('recipes-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/content/recipes', 'manage-content')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={RecipeIndexFilter}
                   ktCardHeaderClasses={'border-0'}
        />
    )
}

export default RecipeIndex;
