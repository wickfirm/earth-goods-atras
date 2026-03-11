import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getRoles} from '../../../../requests/iam/Role';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {RolesColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import RoleIndexFilter from "../partials/IndexFilter.tsx";

const RoleIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.IAM_ROLES, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.ROLES_LIST}
                   requestFunction={getRoles}
                   columnsArray={RolesColumns}
                   cardHeader={
                       {
                           text: 'All Roles',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('roles-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/iam/roles', 'manage-iam')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={RoleIndexFilter}
        />
    )
}

export default RoleIndex;
