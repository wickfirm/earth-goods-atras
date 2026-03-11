import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {toAbsoluteUrl} from '../../../helpers'

const HeaderUserMenu: FC = () => {
    const {currentUser, logout, auth, leaveImpersonateUser} = useAuth()

    return (
        <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-twfirm fw-bold py-4 fs-6 w-275px'
            data-kt-menu='true'
        >
            <div className='menu-item px-3'>
                <div className='menu-content d-flex align-items-center px-3'>
                    <div className='symbol symbol-50px me-5'>
                        {
                            currentUser?.image ?
                                <img alt='Logo' src={currentUser?.image}/>
                                :
                                <img alt='Logo' src={toAbsoluteUrl('/media/avatars/blank.png', true)}/>
                        }
                    </div>

                    <div className='d-flex flex-column'>
                        <div className='fw-bolder d-flex align-items-center fs-5'>
                            {currentUser?.name}
                            {/*<span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>*/}
                        </div>
                        <a href='#' className='fw-bold text-muted text-hover-twfirm fs-7' style={{wordBreak: 'break-all', overflowWrap: 'break-word'}}>
                            {currentUser?.email}
                        </a>
                    </div>
                </div>
            </div>

            <div className='separator my-2'></div>

            <div className='menu-item px-5'>
                <Link to={`/profile`} className='menu-link px-5'>
                    My Profile
                </Link>
            </div>

            <div className='menu-item px-5'>
                <a onClick={logout} className='menu-link px-5'>
                    Sign Out
                </a>
            </div>

            {
                auth?.impersonatedUserId && (
                    <div className='menu-item px-5'>
                        <a onClick={leaveImpersonateUser} className='menu-link px-5'>
                            Leave Impersonate User
                        </a>
                    </div>
                )
            }
        </div>
    )
}

export {HeaderUserMenu}
