import clsx from 'clsx'
import {FC} from 'react'
import {DEFAULT_LANGUAGE} from "../../../helpers/settings.ts";
import {storageUrl} from "../../../helpers/general.ts";
import {CustomerReview} from "../../../models/content/CustomerReview.ts";

type Props = {
    customerReview: CustomerReview
}

const CustomerReviewInfoCell: FC<Props> = ({customerReview}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-square symbol-50px overflow-hidden me-3'>
            <a href='#'>
                {customerReview.avatar ? (
                    <div className='symbol-label'>
                        <img src={storageUrl(customerReview.avatar)} alt={customerReview.name[DEFAULT_LANGUAGE]}
                             className='w-100'/>
                    </div>
                ) : (
                    <div
                        className={clsx(
                            'symbol-label fs-3',
                            'bg-light-secondary',
                            'text-secondary'
                        )}
                    >
                        N/A
                    </div>
                )}
            </a>
        </div>
        <div className='d-flex flex-column' style={{fontSize: '13px'}}>
            <div className="d-flex align-items-center">

                <span className="fw-bold text-gray-800 me-2 ls-n2"
                      style={{fontSize: '18px', lineHeight: '36px'}}>{customerReview.name[DEFAULT_LANGUAGE]}</span>
            </div>
        </div>
    </div>
)

export {CustomerReviewInfoCell}
