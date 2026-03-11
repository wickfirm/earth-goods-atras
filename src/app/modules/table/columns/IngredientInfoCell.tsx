import clsx from 'clsx'
import {FC} from 'react'
import {Ingredient} from "../../../models/commerce/Ingredient.ts";
import {DEFAULT_LANGUAGE} from "../../../helpers/settings.ts";
import {toAbsoluteUrl} from "../../../../_metronic/helpers";

type Props = {
    ingredient: Ingredient
}

const IngredientInfoCell: FC<Props> = ({ingredient}) => (
    <div className='d-flex align-items-center'>
        {/* begin:: Avatar */}
        <div className='symbol symbol-square symbol-50px overflow-hidden me-3'>
            <a href='#'>
                {ingredient.icon ? (
                    <div className='symbol-label'>
                        <img src={toAbsoluteUrl(ingredient.icon)} alt={ingredient.name[DEFAULT_LANGUAGE]} className='w-50'/>
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
                {ingredient.name[DEFAULT_LANGUAGE]}
            </a>
        </div>
    </div>
)

export {IngredientInfoCell}
