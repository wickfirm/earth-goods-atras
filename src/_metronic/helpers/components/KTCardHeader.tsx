import React, {FC} from 'react'
import clsx from 'clsx'
import {CardAction} from "../../../app/components/misc/CardAction.tsx";

export type KTCardHeaderProps = {
    className?: string
    text: string
    id?: string
    bg?: string
    text_color?: string
    collapse?: boolean
    target_id?: string,
    actions?: CardAction[],
    icon?: string,
    icon_style?: string,
    hasSearch?: boolean
}

const KTCardHeader: FC<KTCardHeaderProps> = ({
                                                 className,
                                                 text,
                                                 id,
                                                 bg,
                                                 text_color,
                                                 collapse = false,
                                                 target_id,
                                                 actions,
                                                 icon,
                                                 icon_style,
                                                 hasSearch
                                             }) => {
    const opts: any = {}
    if (collapse) {
        opts['role'] = 'button'
        opts['data-bs-toggle'] = 'collapse'
        opts['data-bs-target'] = `#${target_id}`
        opts['aria-expanded'] = 'true'
        opts['aria-controls'] = `${target_id}`
    }

    return (
        <div
            id={id}
            className={clsx(`card-header`, className && className, bg && `bg-${bg}`)}
            {...opts}
        >
            <div className='card-title d-flex align-items'>
                {hasSearch ?
                    <>
                        <div className="d-flex align-items-center position-relative my-1">
                            <i className="ki-duotone ki-magnifier fs-3 position-absolute ms-4"><span
                                className="path1"></span><span
                                className="path2"></span></i>
                            <input type="text" data-kt-ecommerce-product-filter="search"
                                   className="form-control form-control-solid w-250px ps-12"
                                   placeholder="Search Product"/>
                        </div>
                    </>
                    :
                    <>
                        {
                            icon !== undefined ? <span className="me-2"><i
                                    className={clsx(icon, icon_style !== undefined ? icon_style : '')}></i></span>
                                : ''
                        }

                        <h3 className={`card-label text-${text_color || 'dark'}`}>{text}</h3>
                    </>
                }

            </div>

            {
                (actions && actions.length > 0) ? <div className="card-toolbar">
                    {
                        actions.map((cardAction, index) => {
                            return cardAction.getHtmlComponent(index);
                        })
                    }
                </div> : <></>
            }
        </div>
    )
}

export {KTCardHeader}