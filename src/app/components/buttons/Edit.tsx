import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url: string,
    className?: string
}

const EditButton: React.FC<Props> = ({url, className}) => {
    return (
        <Link to={`${url}/edit`} className={clsx('btn btn-light-warning fs-10', className && className)} title='Edit'>
            <i className={clsx('fa fs-6', 'fa-pencil', 'pe-0')}></i>
        </Link>
    );
}

export default EditButton;