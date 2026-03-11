import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url: string,
    className?: string
}

const AddBulkButton: React.FC<Props> = ({url, className}) => {
    return (
        <Link to={`${url}`} className={clsx('btn btn-light-primary fs-10', className && className)}
              title='Add Bulk'>
            <i className={clsx('fa fs-6', 'fa-boxes', 'pe-0')}></i>
        </Link>
    );
}

export default AddBulkButton;