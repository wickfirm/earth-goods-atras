import React, {useEffect} from 'react'
import {useWickApp} from "../../../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../../../helpers/sections.ts";
import {PageTypes} from "../../../../../helpers/variables.ts";
import SectionCard from "../partials/SectionCard.tsx";

const SectionSettingIndex = () => {
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.CONTENT_SITE, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-3">
                    <SectionCard title="Home Page" link="#"/>
                </div>
                <div className="col-3">
                    <SectionCard title="Shop Page" link="#" light={true}/>
                </div>
            </div>
        </>
    )
}

export default SectionSettingIndex;
