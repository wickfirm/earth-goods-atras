import React, {useEffect} from 'react'
import {useWickApp} from "../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../helpers/sections.ts";
import {PageTypes} from "../../helpers/variables.ts";
import {Content} from "../../../_metronic/layout/components/content";

const ComingSoon = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.GENERAL_COMING_SOON, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Content>
            {/* begin::Row */}
            <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
                {/* begin::Col */}
                <div className='col-xxl-12'>
                    <div className={`card card-flush`}>
                        <div
                            className='card-body d-flex flex-column justify-content-between mt-9 bgi-no-repeat bgi-size-cover bgi-position-x-center pb-0'
                        >
                            <div className='mb-10'>
                                <div className='fs-2hx fw-bold text-gray-800 text-center mb-13'>
                                    Coming Soon
                                </div>
                                <div className='fs-2 fw-bold text-gray-600 text-center mb-13'>
                                    This module is currently in progress and has not been implemented yet. Stay tuned—it
                                    will be live soon!
                                </div>
                            </div>
                            <img
                                className='mx-auto h-600px theme-light-show'
                                src={'/media/illustrations/dozzy-1/5-dark.png'}
                                // src={toAbsoluteUrl('media/illustrations/misc/upgrade.svg')}
                                alt=''
                            />
                        </div>
                    </div>
                </div>
                {/* end::Col */}
            </div>
            {/* end::Row */}
        </Content>
    )
}

export default ComingSoon;
