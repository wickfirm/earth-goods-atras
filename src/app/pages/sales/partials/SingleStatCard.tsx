import clsx from 'clsx';
import React from 'react';
import {formatNumber} from "../../../helpers/dataManipulation.ts";

interface Props {
    value: number,
    text: string,
    fontawesomeIcon?: string,
    currency?: string;
}

const SingleStatCard: React.FC<Props> = ({
                                             value,
                                             text,
                                             fontawesomeIcon,
                                             currency
                                         }) => {
    return (
        <div className="card h-lg-100">
            <div className="card-body d-flex justify-content-between align-items-start flex-column">
                <div className="m-0">
                    <i className={clsx("fa text-gray-600 fs-1", fontawesomeIcon)}></i>
                </div>
                <div className="d-flex flex-column mt-7 mb-2">
                    <div className="d-flex align-items-center">
                        {currency ?
                            <span className="fs-4 fw-semibold text-gray-500 me-1 align-self-start">{currency}</span> : <></>}
                        <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">{formatNumber(value)}</span>
                    </div>
                    <div className="m-0">
                        <span className="fw-semibold fs-7 text-gray-400">{text}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleStatCard;