import {FC, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {Content} from '../../../_metronic/layout/components/content'
import EngageWidget from "../../components/widgets/EngageWidget.tsx";
import {useWickApp} from "../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../helpers/sections.ts";
import {PageTypes} from "../../helpers/variables.ts";

const DashboardPage: FC = () => (
    <>
        <Content>
            {/* begin::Row */}
            <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
                {/* begin::Col */}
                <div className='col-xxl-12'>
                    <EngageWidget
                        cardClasses='h-md-100'
                        backgroundPosition='100% 50%'
                        backgroundImage='media/stock/900x600/42.png'
                        title='Upcoming Dashboard'
                        text={
                            'Our dedicated team is diligently working on perfecting this dashboard, ensuring it exceeds expectations. Stay tuned for its imminent launch!'
                        }
                    />
                </div>
                {/* end::Col */}
            </div>
            {/* end::Row */}
        </Content>
    </>
)

const DashboardWrapper: FC = () => {
    const intl = useIntl()
    const wickApp = useWickApp();

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.DASHBOARD, PageTypes.INDEX))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
            <DashboardPage/>
        </>
    )
}

export {DashboardWrapper}
