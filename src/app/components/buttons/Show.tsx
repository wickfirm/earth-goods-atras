import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url: string,
    className?: string
}

const ShowButton: React.FC<Props> = ({url, className}) => {
    return (
        <Link to={`${url}`} className={clsx('btn btn-light-info fs-10', className && className)} title='View'>
            <i className={clsx('fa fs-6', 'fa-info', 'pe-0')}></i>
        </Link>
    );
}

export default ShowButton;