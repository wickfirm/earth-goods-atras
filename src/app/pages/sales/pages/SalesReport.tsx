import React, {useEffect, useState} from 'react'
import {useWickApp} from "../../../modules/general/WickApp.loader.ts";
import {generatePageTitle} from "../../../helpers/pageTitleGenerator.ts";
import {Sections} from "../../../helpers/sections.ts";
import {PageTypes} from "../../../helpers/variables.ts";
import {Col, Row} from "react-bootstrap";
import BarChart from "../../../components/charts/BarChart.tsx";
import {LabelTooltipFormatting} from "../../../helpers/charts.ts";
import LineChart from "../../../components/charts/LineChart.tsx";
import DonutChart from "../../../components/charts/DonutChart.tsx";
import SingleStatCard from "../partials/SingleStatCard.tsx";
import clsx from "clsx";
import {formatNumber} from "../../../helpers/dataManipulation.ts";
import {getErrorPage, submitRequest} from "../../../helpers/requests.ts";
import {getSalesReport} from "../../../requests/reports/Sales.ts";
import {useNavigate} from "react-router-dom";
import {Sales} from "../../../models/reports/Sales.ts";

const SalesReport = () => {
    const wickApp = useWickApp();
    const navigate = useNavigate();

    const [salesReport, setSalesReport] = useState<Sales | null>(null)

    useEffect(() => {
        wickApp.setPageTitle(generatePageTitle(Sections.SALES_REPORT, PageTypes.REPORT, 'Sales'))

        submitRequest(getSalesReport, [], (response) => {
            const errorPage = getErrorPage(response);

            if (errorPage) {
                navigate(errorPage);
            } else {
                setSalesReport(response);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(salesReport)
    return (
        <>
            {
                salesReport && (
                    <>
                        <Row>
                            <Col sm={6} xl={3} className="mb-5">
                                <SingleStatCard value={salesReport.totalSales}
                                                text={'Total Sales'}
                                                fontawesomeIcon={'fa-chart-line'}
                                                currency="AED"
                                />
                            </Col>

                            <Col sm={6} xl={3} className="mb-5">
                                <SingleStatCard value={salesReport.totalOrders}
                                                text={'Total Orders'}
                                                fontawesomeIcon={'fa-shopping-cart'}
                                />
                            </Col>

                            <Col sm={6} xl={3} className="mb-5">
                                <SingleStatCard value={salesReport.aov} fontawesomeIcon={'fa-calculator'}
                                                text={'Average Order Value'}/>
                            </Col>

                            <Col sm={6} xl={3} className="mb-5">
                                <SingleStatCard value={salesReport.totalUnitsSold} fontawesomeIcon={'fa-box'} text={'Total Units Sold'}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12} xl={6}>
                                <div className="card bg-light-primary card-xl-stretch mb-5 mb-xl-8">
                                    {/* Begin Card Body */}
                                    <div className="card-body my-3">
                                        <div className="card-title fw-bold text-primary fs-5 mb-3 d-block">
                                            Conversion Rate
                                        </div>

                                        <div className="py-1">
                                            <span className="text-gray-900 fs-1 fw-bold me-2">{formatNumber(salesReport.conversionRate)}%</span>
                                            <span
                                                className="fw-semibold text-muted fs-7">Visitors who made a purchase</span>
                                        </div>
                                    </div>
                                    {/* End Card Body */}
                                </div>
                            </Col>
                            {/*<Col sm={12} xl={4}>*/}
                            {/*    <div className="card bg-light-primary card-xl-stretch mb-5 mb-xl-8">*/}
                            {/*        /!* Begin Card Body *!/*/}
                            {/*        <div className="card-body my-3">*/}
                            {/*            <div className="card-title fw-bold text-primary fs-5 mb-3 d-block">*/}
                            {/*                Cart Abandonment Rate*/}
                            {/*            </div>*/}

                            {/*            <div className="py-1">*/}
                            {/*                <span className="text-gray-900 fs-1 fw-bold me-2">{formatNumber(salesReport.cartAbandonmentRate)}%</span>*/}
                            {/*                <span*/}
                            {/*                    className="fw-semibold text-muted fs-7">Cart items not completed checkout</span>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        /!* End Card Body *!/*/}
                            {/*    </div>*/}
                            {/*</Col>*/}
                            <Col sm={12} xl={6}>
                                <div className="card bg-light-primary card-xl-stretch mb-5 mb-xl-8">
                                    {/* Begin Card Body */}
                                    <div className="card-body my-3">
                                        <div className="card-title fw-bold text-primary fs-5 mb-3 d-block">
                                            Checkout Abandonment Rate
                                        </div>

                                        <div className="py-1">
                                            <span className="text-gray-900 fs-1 fw-bold me-2">{formatNumber(salesReport.checkoutAbandonmentRate)}%</span>
                                            <span
                                                className="fw-semibold text-muted fs-7">Checkout started but not completed</span>
                                        </div>
                                    </div>
                                    {/* End Card Body */}
                                </div>
                            </Col>
                        </Row>

                        <Row className="d-flex align-items-stretch mb-5">
                            <Col sm={12} xl={4} className="d-flex flex-column gap-6">
                                <div className="card card-xl-stretch theme-dark-bg-body">
                                    <div className="card-body d-flex flex-column" style={{padding: '20px 30px'}}>
                                        <div className="d-flex flex-column flex-grow-1">
                                            <div className="m-0">
                                                <i className={clsx("fa text-gray-600 fs-1", "fa-user-plus")}></i>
                                            </div>

                                            <div className="d-flex flex-column mt-7 mb-2">
                                            <span
                                                className="fw-semibold fs-1 text-gray-800">{formatNumber(salesReport.newCustomers)}</span>
                                                <div className="m-0">
                                                    <span className="fw-semibold fs-7 text-gray-400">New Customers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-xl-stretch theme-dark-bg-body">
                                    <div className="card-body d-flex flex-column" style={{padding: '20px 30px'}}>
                                        <div className="d-flex flex-column flex-grow-1">
                                            <div className="m-0">
                                                <i className={clsx("fa text-gray-600 fs-1", "fa-users")}></i>
                                            </div>

                                            <div className="d-flex flex-column mt-7 mb-2">
                                            <span
                                                className="fw-semibold fs-1 text-gray-800">{formatNumber(salesReport.totalCustomers)}</span>
                                                <div className="m-0">
                                                    <span
                                                        className="fw-semibold fs-7 text-gray-400">Number of Customers</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-xl-stretch theme-dark-bg-body">
                                    <div className="card-body d-flex flex-column" style={{padding: '20px 30px'}}>
                                        <div className="d-flex flex-column flex-grow-1">
                                            <div className="m-0">
                                                <i className={clsx("fa text-gray-600 fs-1", "fa-sync-alt")}></i>
                                            </div>

                                            <div className="d-flex flex-column mt-7 mb-2">
                                            <span
                                                className="fw-semibold fs-1 text-gray-800">{formatNumber(salesReport.aof)}</span>
                                                <div className="m-0">
                                        <span
                                            className="fw-semibold fs-7 text-gray-400">Average Order Frequency <small>(AOF)</small></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col sm={12} xl={8} className="d-flex flex-column">
                                <LineChart className='card-xl-stretch'
                                           title={'Sales This Month'}
                                           valueFormatting={LabelTooltipFormatting.MoneyAbbreviated}
                                           currency={'AED'}
                                           withStroke={false}
                                           description={'The total sales for the current month, highlighting trends and performance'}
                                           labels={salesReport.dailySalesLabels}
                                           series={salesReport.dailySalesSeries} fillColor="#E9F3FF"/>
                            </Col>
                        </Row>

                        <Row className={'justify-content-center'}>
                            <Col sm={12} xl={12} className="mb-5">
                                <BarChart className='card-xl-stretch'
                                          title={'Top Selling Products'}
                                          valueFormatting={LabelTooltipFormatting.MoneyAbbreviated}
                                          currency={''}
                                          description={''}
                                          isHorizontal={true}
                                          labels={salesReport.labels}
                                          series={salesReport.series}
                                            fillColor={['#17C653']}
                                />
                            </Col>
                            <Col sm={12} xl={12} className="mb-5">
                                <BarChart className='card-xl-stretch'
                                          title={'Low-performing Products'}
                                          valueFormatting={LabelTooltipFormatting.MoneyAbbreviated}
                                          currency={''}
                                          description={''}
                                          isHorizontal={true}
                                          labels={salesReport.lowLabels}
                                          series={salesReport.lowSeries}
                                          fillColor={['#F6C000']}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={12} xl={6} className="mb-5">
                                <DonutChart series={salesReport.categorySalesSeries}
                                            labels={salesReport.categorySalesLabels}
                                            title={'Product Categories Sales Breakdown'} description={''}/>
                            </Col>

                            {/*<Col sm={12} xl={6} className="mb-5">*/}
                                {/*TODO: since we dont have yet any order status update and shipping time to calculate it accordingly*/}
                                {/*<BarChart className='card-xl-stretch'*/}
                                {/*          title={'Average Fulfillment Time'}*/}
                                {/*          valueFormatting={LabelTooltipFormatting.MoneyAbbreviated}*/}
                                {/*          currency={'(sec)'}*/}
                                {/*          description={''}*/}
                                {/*          isHorizontal={true}*/}
                                {/*          labels={['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}*/}
                                {/*          series={[*/}
                                {/*              {*/}
                                {/*                  name: 'Order Processing Time',*/}
                                {/*                  data: [44, 55, 57, 56, 61, 60],*/}
                                {/*              },*/}
                                {/*              {*/}
                                {/*                  name: 'Shipping Time',*/}
                                {/*                  data: [76, 85, 101, 98, 87, 105],*/}
                                {/*              }*/}
                                {/*          ]}/>*/}
                            {/*</Col>*/}
                        </Row>
                    </>
                )
            }
        </>
    )
}

export default SalesReport;
