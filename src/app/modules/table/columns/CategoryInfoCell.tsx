import clsx from 'clsx'
import {FC} from 'react'
import {Category} from "../../../models/commerce/Category.ts";
import {toAbsoluteUrl} from "../../../../_metronic/helpers";
import {DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../helpers/settings.ts";

type Props = {
    category: Category
}

const CategoryInfoCell: FC<Props> = ({category}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-square symbol-50px overflow-hidden me-3'>
            <a href='#'>
                {category.menu_thumbnail ? (
                    <div className='symbol-label'>
                        <img src={toAbsoluteUrl(category.menu_thumbnail[DEFAULT_RESPONSIVE_IMAGE_SIZE])} alt={category.name.en} className='w-100'/>
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
            <a href='#' className='text-gray-800 text-hover-twfirm mb-1 fw-bold'>
                {category.name.en}
            </a>
        </div>
    </div>
)

export {CategoryInfoCell}
