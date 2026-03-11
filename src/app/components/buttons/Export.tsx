import clsx from 'clsx';
import React from 'react';
import {Button} from 'react-bootstrap';
import {genericExportHandler} from '../../helpers/general';
import {useWickApp} from "../../modules/general/WickApp.loader.ts";

type Props = {
    exportQuery: string,
    exportEndpoint: string,
    className?: string
}

const ExportButton: React.FC<Props> = ({exportQuery, exportEndpoint, className}) => {
    const wickApp = useWickApp();

    const exportHandler = () => {
        // we already have the query for our export request ready based on filters
        // we just need to do the api call
        genericExportHandler(wickApp, exportQuery, exportEndpoint);
    }

    return (
        <Button type="button" className={clsx('btn btn-light-info fs-10', className)} title='Export'
                onClick={exportHandler}>
            <i className={clsx('fa fs-6', 'fa-download', 'pe-0')}></i>
        </Button>
    );
}

export default ExportButton;