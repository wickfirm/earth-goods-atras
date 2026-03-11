import React, {Dispatch} from 'react';
import clsx from 'clsx';
import {Button} from 'react-bootstrap';

type Props = {
    target: string,
    showFilter: boolean,
    setShowFilter: Dispatch<React.SetStateAction<boolean>>,
    className?: string
}

const FilterButton: React.FC<Props> = ({target, showFilter, setShowFilter, className}) => {
    return (
        <Button type="button" className={clsx('btn btn-light-twfirm fs-10', className && className)} title='Filter'
                onClick={() => setShowFilter && setShowFilter(!showFilter)} aria-controls={target}
                aria-expanded={showFilter}>
            {
                showFilter ? <i className={clsx('fa fs-6', 'fa-solid fa-filter', 'pe-0')}></i> :
                    <i className={clsx('fa fs-6', 'fa-solid fa-filter', 'pe-0')}></i>
            }
        </Button>
    );
}

export default FilterButton;