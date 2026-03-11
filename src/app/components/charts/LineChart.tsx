import {ApexOptions} from 'apexcharts';
import React, {useRef} from 'react';
import {getCSSVariableValue} from '../../../_metronic/assets/ts/_utils';
import {
    getBorderColor,
    getColors,
    getLabelColor,
    getLabelFormatter,
    getLightColors, getNoDataSettings, getTooltipFormatter,
    LabelTooltipFormatting, LineCurveStyle
} from '../../helpers/charts';
import Chart from './Chart';

type Props = {
    series: ApexAxisChartSeries,
    labels: string[],
    className?: string,
    withStroke?: boolean,
    lineCurveStyle?: LineCurveStyle,
    valueFormatting?: LabelTooltipFormatting,
    currency?: string,
    title?: string,
    description?: string,
    xAxisTitle?: string,
    yAxisTitle?: string,
    height?: number,
    fillColor?: string
}

const LineChart: React.FC<Props> = ({
                                        series,
                                        labels,
                                        className = '',
                                        withStroke = false,
                                        lineCurveStyle = LineCurveStyle.SMOOTH,
                                        valueFormatting = LabelTooltipFormatting.NoFormatting,
                                        currency = '',
                                        title,
                                        description,
                                        xAxisTitle,
                                        yAxisTitle,
                                        height = 350,
    fillColor
                                    }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    return (
        <Chart chartRef={chartRef} cardClassName={className}
               getChartOptions={getChartOptions}
               getChartOptionsArgs={[height, series, labels, withStroke, lineCurveStyle, valueFormatting, currency, xAxisTitle, yAxisTitle, fillColor]}
               refreshDeps={[series, labels, xAxisTitle, yAxisTitle]}
               title={title}
               description={description}
               height={height}/>
    )
}

function getChartOptions(height: number, series: ApexAxisChartSeries, labels: string[], withStroke: boolean, lineCurveStyle: LineCurveStyle, valueFormatting: LabelTooltipFormatting, currency: string, xAxisTitle: string, yAxisTitle: string, fillColor: string): ApexOptions {
    const labelColor = getLabelColor();
    const borderColor = getBorderColor();

    const baseColor = getCSSVariableValue('--bs-twfirm');

    let settings: ApexOptions = {
        series: series,
        chart: {
            fontFamily: 'inherit',
            type: 'area',
            height: height,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            }
        },
        plotOptions: {},
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: 'solid',
            opacity: 1,
            colors: [fillColor ? fillColor : baseColor]
        },
        xaxis: {
            categories: labels,
            title: {
                text: xAxisTitle
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
                formatter: function (val: any) {
                    return getLabelFormatter(val, valueFormatting, currency);
                }
            },
            crosshairs: {
                position: 'front',
                stroke: {
                    color: baseColor,
                    width: 1,
                    dashArray: 3,
                },
            },
            tooltip: {
                enabled: true,
                formatter: undefined,
                offsetY: 0,
                style: {
                    fontSize: '12px',
                },
            },
        },
        yaxis: {
            title: {
                text: yAxisTitle
            },
            labels: {
                style: {
                    colors: labelColor,
                    fontSize: '12px',
                },
                formatter: function (val) {
                    return getLabelFormatter(val, valueFormatting, currency);
                }
            },
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0,
                },
            },
        },
        tooltip: {
            style: {
                fontSize: '12px',
            },
            y: {
                formatter: function (val) {
                    return getTooltipFormatter(val, valueFormatting, currency);
                }
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        markers: {
            strokeColors: baseColor,
            strokeWidth: 3,
        },
        noData: getNoDataSettings()
    }

    if (withStroke) {
        settings = {
            ...settings,
            colors: getLightColors(),
            stroke: {
                curve: lineCurveStyle,
                show: true,
                width: 3,
                colors: getColors()
            }
        }
    } else {
        settings = {
            ...settings,
            colors: getColors(),
            stroke: {
                curve: lineCurveStyle,
                show: false
            }
        }
    }

    return settings;
}

export default LineChart;