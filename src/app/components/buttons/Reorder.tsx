import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

type Props = {
    url: string,
    className?: string
}

const ReorderButton: React.FC<Props> = ({url, className}) => {
    return (
        <Link to={`${url}`} className={clsx('btn btn-light-primary fs-10', className && className)}
              title='Reorder'>
            <i className={clsx('fa fs-6', 'fa-sort', 'pe-0')}></i>
        </Link>
    );
}

export default ReorderButton;