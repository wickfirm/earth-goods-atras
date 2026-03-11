import clsx from 'clsx'
import {KTIcon, toAbsoluteUrl} from '../../../helpers'
import {HeaderUserMenu, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'
import {useAuth} from "../../../../app/modules/auth";

const itemClass = 'ms-1 ms-md-4'
const userAvatarClass = 'symbol-35px'
const btnIconClass = 'fs-2'

const Navbar = () => {
    const {config} = useLayout()
    const {currentUser} = useAuth()

    return (
        <div className='app-navbar flex-shrink-0'>
            <div className={clsx('app-navbar-item', itemClass)}>
                <ThemeModeSwitcher toggleBtnClass={clsx('btn-active-light-twfirm btn-custom')}/>
            </div>

            <div className={clsx('app-navbar-item', itemClass)}>
                <div
                    className={clsx('cursor-pointer symbol', userAvatarClass)}
                    data-kt-menu-trigger="{default: 'click'}"
                    data-kt-menu-attach='parent'
                    data-kt-menu-placement='bottom-end'
                >
                    {
                        currentUser?.image ?
                            <img alt='Logo' src={currentUser?.image}/>
                            :
                            <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png', true)}/>
                    }
                </div>
                <HeaderUserMenu/>
            </div>

            {config.app?.header?.default?.menu?.display && (
                <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
                    <div
                        className='btn btn-icon btn-active-color-twfirm w-35px h-35px'
                        id='kt_app_header_menu_toggle'
                    >
                        <KTIcon iconName='text-align-left' className={btnIconClass}/>
                    </div>
                </div>
            )}
        </div>
    )
}

export {Navbar}
