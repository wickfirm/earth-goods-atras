import ApexCharts, {ApexOptions} from 'apexcharts';
import React, {useEffect} from 'react';
import {Card} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/CardHeader';
import {useThemeMode} from '../../../_metronic/partials';

interface Props {
    chartRef: React.MutableRefObject<HTMLDivElement | null>,
    getChartOptions: (...args: any[]) => ApexOptions,
    getChartOptionsArgs: any[],
    refreshDeps: any[],
    height?: number,
    title?: string,
    description?: string,
    cardClassName?: string,
    cardHeaderClassName?: string,
    cardBodyClassName?: string,
}

const Chart: React.FC<Props> = ({
                                    chartRef,
                                    getChartOptions,
                                    getChartOptionsArgs,
                                    refreshDeps,
                                    height,
                                    title,
                                    description,
                                    cardClassName = '',
                                    cardHeaderClassName = '',
                                    cardBodyClassName = ''
                                }) => {
    const {mode} = useThemeMode()

    // the return in the useEffect means that when the component is no longer being rendered because
    // the user went to another page that doesn't need it, the chart will get destroyed
    useEffect(() => {
        const chart = refreshChart()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...refreshDeps, mode, chartRef, height])

    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const chart = new ApexCharts(chartRef.current, getChartOptions(...getChartOptionsArgs))

        if (chart) {
            chart.render()
        }

        return chart
    }

    return (
        <Card className={`${cardClassName}`}>
            {/* begin::Header */}
            {
                (title || description) &&
                <CardHeader className={`border-0 pt-5 ${cardHeaderClassName}`}>
                    {/* begin::Title */}
                    <h3 className='card-title align-items-start flex-column'>
                        {title && <span className='card-label fw-bold fs-3 mb-1'>{title}</span>}

                        {description && <span className='text-muted fw-semibold fs-7'>{description}</span>}
                    </h3>
                    {/* end::Title */}

                    {/*Note: if you want to add a toolbar go to the metronic source files*/}
                </CardHeader>
            }
            {/* end::Header */}

            {/* begin::Body */}
            <div className={`card-body ${cardBodyClassName}`}>
                {/* begin::Chart */}
                {
                    // height ?
                    //     <div ref={chartRef} style={{height: `${height}px`}}/>
                    //     :
                    <div ref={chartRef}/>
                }

                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </Card>
    )
}

export default Chart;