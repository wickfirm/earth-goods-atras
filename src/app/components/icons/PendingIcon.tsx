import React from 'react';
import clsx from 'clsx';

type Props = {
    className?: string
}

const PendingIcon: React.FC<Props> = () => {
    return (
        <i className={clsx('fa fs-3 text-twfirm', 'fa-hourglass-clock')}></i>
    );
}

export default PendingIcon;