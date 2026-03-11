import React, {Suspense} from 'react'
import {Outlet} from 'react-router-dom'
import {I18nProvider} from '../_metronic/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../_metronic/layout/core'
import {MasterInit} from '../_metronic/layout/MasterInit'
import {AuthInit} from './modules/auth'
import {ThemeModeProvider} from '../_metronic/partials'
import {AccessControlProvider} from "./modules/auth/AuthAccessControl.tsx";
import {WickApp} from "./modules/general/WickApp.tsx";

const App = () => {
    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <I18nProvider>
                <LayoutProvider>
                    <ThemeModeProvider>
                        <AuthInit>
                            <AccessControlProvider>
                                <WickApp>
                                    <Outlet/>
                                    <MasterInit/>
                                </WickApp>
                            </AccessControlProvider>
                        </AuthInit>
                    </ThemeModeProvider>
                </LayoutProvider>
            </I18nProvider>
        </Suspense>
    )
}

export {App}
