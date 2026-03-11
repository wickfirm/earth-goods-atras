import {ApexOptions} from 'apexcharts';
import React, {useRef} from 'react';
import {getCSSVariableValue} from '../../../_metronic/assets/ts/_utils';
import {getNoDataSettings} from '../../helpers/charts';
import Chart from './Chart';

interface Props {
    series: number,
    label: string,
    className?: string,
    title?: string,
    description?: string,
    height?: number
}

const RadialChart: React.FC<Props> = ({
                                          series,
                                          label,
                                          className = '',
                                          title,
                                          description,
                                          height = 250
                                      }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    return (
        <Chart chartRef={chartRef} cardClassName={className} cardBodyClassName={`pb-0`}
               getChartOptions={getChartOptions}
               getChartOptionsArgs={[height, series, label]}
               refreshDeps={[series, label]}
               title={title}
               description={description}
               height={height}/>
    )
}

function getChartOptions(height: number, series: number, label: string): ApexOptions {
    let color = 'danger';

    if (series >= 50) {
        color = 'success';
    }

    return {
        series: [series],
        chart: {
            height: height,
            width: '100%',
            type: 'radialBar',
            offsetY: 0
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,

                hollow: {
                    margin: 0,
                    size: "70%"
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: "10px",
                        fontWeight: "400",
                        offsetY: -5,
                        color: getCSSVariableValue('--bs-gray-700'),
                    },
                    value: {
                        color: getCSSVariableValue('--bs-black'),
                        fontSize: "22px",
                        fontWeight: "bold",
                        offsetY: -40,
                        show: true,
                    }
                },
                track: {
                    background: getCSSVariableValue(`--bs-${color}-light`),
                    strokeWidth: '100%'
                }
            }
        },
        colors: [getCSSVariableValue(`--bs-${color}`)],
        stroke: {
            lineCap: "round",
        },
        labels: [label, `${series.toFixed(2)}%`],
        noData: getNoDataSettings()
    };
}

export default RadialChart;