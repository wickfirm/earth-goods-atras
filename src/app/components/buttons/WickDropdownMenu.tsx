import clsx from 'clsx';
import React from 'react';
import {Link} from 'react-router-dom';
import {DropdownItemType} from '../../helpers/variables';
import {WickMenuItem} from '../misc/WickDropdownMenuItem.tsx';

interface ItemProps {
    type: DropdownItemType,
    text: string,
    color?: string,
    url?: string,
    onClickHandler?: any,
    onClickParams?: any[]
}

export const WickDropdownItem: React.FC<ItemProps> = ({
                                                          type,
                                                          text,
                                                          color = 'twfirm',
                                                          url,
                                                          onClickHandler,
                                                          onClickParams = []
                                                      }) => {
    const localOnClickHandler = () => {
        if (onClickHandler) {
            onClickHandler(...onClickParams)
        }
    }

    return (
        <div className='menu-item px-3 my-0'>
            {
                type === DropdownItemType.URL && url
                    ?
                    <Link to={url} className="menu-link px-3 py-2">
                        <span className={`menu-title text-start text-hover-${color}`}>{text}</span>
                    </Link>
                    :
                    <button type="button" className="menu-link px-3 py-2 bg-white"
                            onClick={localOnClickHandler}>
                        <span className={`menu-title text-start text-hover-${color}`}>{text}</span>
                    </button>
            }
        </div>
    )
}

interface ButtonProps {
    dropdownItems: WickMenuItem[],
    fontawesomeIcon: string,
    color?: string,
    className?: string
}

export const WickDropdownMenu: React.FC<ButtonProps> = ({
                                                            dropdownItems,
                                                            fontawesomeIcon,
                                                            color = 'twfirm',
                                                            className
                                                        }) => {
    return (
        <>
            <button
                type='button'
                className={clsx(`btn btn-color-${color} btn-light-${color} fs-6`, className ? className : '')}
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'
                title='Actions'
            >
                <i className={clsx('fa fs-4', fontawesomeIcon, 'pe-0')}></i>
            </button>
            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg fw-semibold py-4 fs-base w-175px'
                data-kt-menu='true'>

                {
                    dropdownItems.map((menuItem: WickMenuItem, index) => {
                        return menuItem.getHtmlComponent();
                        // return menuItem.getHtmlComponent(index, color);
                    })
                }
            </div>
        </>

    )
}