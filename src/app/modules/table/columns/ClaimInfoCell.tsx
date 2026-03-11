import clsx from 'clsx'
import {FC} from 'react'
import {Claim} from "../../../models/commerce/Claim.ts";

type Props = {
    claim: Claim
}

const ClaimInfoCell: FC<Props> = ({claim}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        {/*<div className='symbol symbol-square symbol-50px overflow-hidden me-3'>*/}
        {/*    <a href='#'>*/}
        {/*        {claim.icon.en ? (*/}
        {/*            <div className='symbol-label'>*/}
        {/*                <img src={claim.icon.en} alt={claim.name.en} className='w-100'/>*/}
        {/*            </div>*/}
        {/*        ) : (*/}
        {/*            <div*/}
        {/*                className={clsx(*/}
        {/*                    'symbol-label fs-3',*/}
        {/*                    'bg-light-secondary',*/}
        {/*                    'text-secondary'*/}
        {/*                )}*/}
        {/*            >*/}
        {/*                N/A*/}
        {/*            </div>*/}
        {/*        )}*/}
        {/*    </a>*/}
        {/*</div>*/}
        <div className='d-flex flex-column' style={{fontSize: '13px'}}>
            <a href='#' className='text-gray-800 text-hover-twfirm mb-1 fw-bold'>
                {claim.name.en}
            </a>
        </div>
    </div>
)

export {ClaimInfoCell}
