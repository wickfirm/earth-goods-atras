import React, {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {KTSVG, toAbsoluteUrl} from "../../../_metronic/helpers";
import {storageUrl} from "../../helpers/general.ts";
import {DEFAULT_LANGUAGE} from "../../helpers/settings.ts";

const AuthLayout = () => {
    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            root.style.height = '100%'
        }
        return () => {
            if (root) {
                root.style.height = 'auto'
            }
        }
    }, [])

    return (
        <div
            className={'d-flex flex-column flex-lg-row flex-column-fluid'}
            style={{backgroundColor: "#FFEEC9"}}
        >
            <div className="position-absolute hidden md:block" style={{top: '-1%', left: 0, zIndex: '99999999'}}>
                <img src="/media/svg/shapes/flower-green-rotated.svg"
                     alt=""
                     className='w-100'/>
            </div>

            <div
                className={'d-flex flex-column-fluid justify-content-center p-12'}
                style={{
                    minHeight: '100vh', // Keeps the container vertically centered if needed
                }}
            >
                <div className={'d-flex flex-column flex-center rounded-4 w-md-600px p-10'}>
                    <div className={'d-flex flex-center flex-column align-items-stretch h-lg-100 w-md-400px'}>
                        <div className={'d-flex flex-center flex-column flex-column-fluid pb-15 pb-lg-20'}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>


            <div className="position-absolute bottom-0 hidden md:block" style={{right: '14%', zIndex: '99999999'}}>
                <img src="/media/svg/shapes/flower-green.svg"
                     alt=""
                     className='w-100'/>
            </div>
        </div>
    )
}

export {AuthLayout}
