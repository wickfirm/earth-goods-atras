/* eslint-disable react-refresh/only-export-components */
import {createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'
import {User} from "../../../models/iam/User.ts";
import {Role} from "../../../models/iam/Role.ts";

type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: User | undefined
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>
    logout: () => void
    leaveImpersonateUser: () => void
    hasRoles: (user: User | undefined, roles: string[]) => boolean
    hasAnyRoles: (user: User | undefined, roles: string[]) => boolean
}

const initAuthContextPropsState = {
    auth: authHelper.getAuth(),
    saveAuth: () => {
    },
    currentUser: undefined,
    setCurrentUser: () => {
    },
    logout: () => {
    },
    leaveImpersonateUser: () => {
    },
    hasRoles: () => false,
    hasAnyRoles: () => false,
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
    const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
    const [currentUser, setCurrentUser] = useState<User | undefined>()
    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth)
        if (auth) {
            authHelper.setAuth(auth)
        } else {
            authHelper.removeAuth()
        }
    }

    const logout = () => {
        saveAuth(undefined)
        setCurrentUser(undefined)
    }

    const leaveImpersonateUser = function () {
        // we just need to update the auth user to have the impersonated user id
        // remove existing impersonatedUserId
        if (auth) {
            const {...newAuth} = auth;

            saveAuth({...newAuth, impersonatedUserId: undefined});

            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    }

    const hasRoles = (user: User | undefined, roles: string[]) => {
        // this function will loop over the provided user's roles
        // and returns true if he has all roles (can be used for single case where
        // we need to know if the user has a single role)
        let foundNotExist = false

        roles.forEach((roleName: string) => {
            // we loop over each role name and we check if the user has it
            let exist = false

            // we then check if the user has the role
            user?.roles?.forEach((role: Role) => {
                if (role.name === roleName) {
                    exist = true
                }
            })

            if (!exist) {
                foundNotExist = true
            }
        })

        return !foundNotExist
    }

    const hasAnyRoles = (user: User | undefined, roles: string[]) => {
        // this function will loop over the provided user's roles
        // and returns true if he has any of the roles
        let exist = false

        user?.roles?.forEach((role: Role) => {
            if (roles.includes(role.name)) {
                exist = true
            }
        })

        return exist
    }

    return (
        <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout, leaveImpersonateUser, hasRoles, hasAnyRoles}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthInit: FC<WithChildren> = ({children}) => {
    const {auth, currentUser, logout, setCurrentUser} = useAuth()
    const [showSplashScreen, setShowSplashScreen] = useState(true)

    // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
    useEffect(() => {
        const requestUser = async (apiToken: string) => {
            try {
                if (!currentUser) {
                    const {data} = await getUserByToken(apiToken)
                    if (data) {
                        setCurrentUser(data)
                    }
                }
            } catch (error) {
                if (currentUser) {
                    logout()
                }
            } finally {
                setShowSplashScreen(false)
            }
        }

        if (auth && auth.token) {
            requestUser(auth.token)
        } else {
            logout()
            setShowSplashScreen(false)
        }
        // eslint-disable-next-line
    }, [])

    return showSplashScreen ? <LayoutSplashScreen/> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
