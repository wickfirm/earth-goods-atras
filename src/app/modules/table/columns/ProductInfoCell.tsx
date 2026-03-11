import clsx from 'clsx'
import {FC} from 'react'
import {Product} from "../../../models/commerce/Product.ts";
import {DEFAULT_LANGUAGE, DEFAULT_RESPONSIVE_IMAGE_SIZE} from "../../../helpers/settings.ts";
import {storageUrl} from "../../../helpers/general.ts";

type Props = {
    product: Product
}

const ProductInfoCell: FC<Props> = ({product}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-square symbol-50px overflow-hidden me-3'>
            <a href='#'>
                {product.thumbnail ? (
                    <div className='symbol-label'>
                        <img src={storageUrl(product.thumbnail.media[DEFAULT_RESPONSIVE_IMAGE_SIZE])} alt={product.name[DEFAULT_LANGUAGE]} className='w-100'/>
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

                <span className="fw-bold text-gray-800 me-2 ls-n2" style={{fontSize: '18px', lineHeight: '36px'}}>{product.name[DEFAULT_LANGUAGE]}</span>
                <span className="fw-normal me-1 align-self-start">
                      <span className="badge badge-light-info">
                           {product.category.name[DEFAULT_LANGUAGE]}
                      </span>
                </span>
            </div>
        </div>
    </div>
)

export {ProductInfoCell}
