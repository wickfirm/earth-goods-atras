import {useEffect, useState} from 'react'

import {QUERIES} from '../../../../../_metronic/helpers'
import {Sections} from '../../../../helpers/sections';
import {PageTypes} from '../../../../helpers/variables';
import {EXPORT_ENDPOINT, getPaymentMethods} from '../../../../requests/misc/PaymentMethod';
import {useWickApp} from "../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../helpers/pageTitleGenerator.ts";
import WickIndex from "../../../../components/tables/WickIndex.tsx";
import {PaymentMethodsColumns} from "../core/TableColumns.tsx";
import {CreateCardAction, ExportCardAction, FilterCardAction} from "../../../../components/misc/CardAction.tsx";
import PaymentMethodIndexFilter from "../partials/IndexFilter.tsx";

const PaymentMethodIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.MISC_PAYMENT_METHODS, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [exportQuery, setExportQuery] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);

    return (
        <WickIndex queryId={QUERIES.PAYMENT_METHODS_LIST}
                   requestFunction={getPaymentMethods}
                   columnsArray={PaymentMethodsColumns}
                   cardHeader={
                       {
                           text: 'All PaymentMethods',
                           actions: [new ExportCardAction(exportQuery, EXPORT_ENDPOINT),
                               new FilterCardAction('payment-methods-list-filter', showFilter, setShowFilter),
                               new CreateCardAction('/misc/payment-methods', 'manage-misc')],
                       }}
                   showFilter={showFilter}
                   setExportQuery={setExportQuery}
                   FilterComponent={PaymentMethodIndexFilter}
        />
    )
}

export default PaymentMethodIndex;
