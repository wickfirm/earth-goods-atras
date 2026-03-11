import {ApexOptions} from 'apexcharts';
import React, {useRef} from 'react';
import {
    getBorderColor,
    getColors,
    getLabelColor,
    getLabelFormatter, getNoDataSettings, getTooltipFormatter,
    LabelTooltipFormatting
} from '../../helpers/charts';
import Chart from './Chart';
import {getCSSVariableValue} from "../../../_metronic/assets/ts/_utils";

interface Props {
    series: ApexAxisChartSeries,
    labels: string[],
    isHorizontal: boolean,
    className?: string,
    valueFormatting?: LabelTooltipFormatting,
    currency?: string,
    title?: string,
    description?: string,
    xAxisTitle?: string,
    yAxisTitle?: string,
    height?: number,
    fillColor?: string[]
}

const BarChart: React.FC<Props> = ({
                                       series,
                                       labels,
                                       isHorizontal = false,
                                       className = '',
                                       valueFormatting = LabelTooltipFormatting.NoFormatting,
                                       currency = '',
                                       title = '',
                                       description = '',
                                       xAxisTitle = '',
                                       yAxisTitle = '',
                                       height = 350,
                                       fillColor
                                   }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    return (
        <Chart chartRef={chartRef} cardClassName={className}
               getChartOptions={getChartOptions}
               getChartOptionsArgs={[height, series, isHorizontal, labels, valueFormatting, currency, xAxisTitle, yAxisTitle, fillColor]}
               refreshDeps={[series, labels, isHorizontal, xAxisTitle, yAxisTitle]}
               title={title}
               description={description}
               height={height}/>
    )
}

function getChartOptions(height: number, series: ApexAxisChartSeries, isHorizontal: boolean, labels: string[], valueFormatting: LabelTooltipFormatting, currency: string, xAxisTitle: string, yAxisTitle: string, fillColor: string[]): ApexOptions {
    const labelColor = getLabelColor();
    const borderColor = getBorderColor();
    let fill;

    if (fillColor) {
        fill =  {
            opacity: 1,
            colors: fillColor
        };
    } else {
        fill =  {
            opacity: 1,
        };
    }

    // Calculate if we need to rotate labels based on their length
    const maxLabelLength = Math.max(...labels.map(label => label.length));
    const shouldRotateLabels = !isHorizontal && maxLabelLength > 10;

    return {
        series: series,
        chart: {
            fontFamily: 'inherit',
            type: 'bar',
            height: height,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false
            },
            // Add margins to accommodate rotated labels
            ...(shouldRotateLabels && {
                offsetY: 10,
                offsetX: 0,
            })
        },
        plotOptions: {
            bar: {
                horizontal: isHorizontal,
                columnWidth: '30%',
                borderRadius: 5,
            },
        },
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
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
                formatter: function (val) {
                    return getLabelFormatter(val, valueFormatting, currency);
                },
                // Prevent label truncation
                trim: false,
                // Don't hide overlapping labels
                hideOverlappingLabels: false,
                // Set max height to allow more space
                maxHeight: isHorizontal ? undefined : (shouldRotateLabels ? 120 : 60),
                // Rotate labels if they're too long (for vertical charts)
                ...(shouldRotateLabels && {
                    rotate: -45,
                    rotateAlways: true,
                }),
                // For horizontal charts, allow more space
                ...(isHorizontal && {
                    maxWidth: 200,
                })
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
                },
                // For horizontal charts, ensure y-axis labels are fully visible
                ...(isHorizontal && {
                    trim: false,
                    maxWidth: 450,
                })
            },
        },
        fill: fill,
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
                },
            },
        },
        colors: getColors(),
        grid: {
            borderColor: borderColor,
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true,
                },
            },
            // Add padding to accommodate wider labels
            padding: {
                top: 10,
                right: isHorizontal ? 10 : 30,
                bottom: isHorizontal ? 30 : 50,
                left: isHorizontal ? 60 : 20
            },
            // // Add padding to accommodate labels
            // padding: {
            //     top: 0,
            //     right: 0,
            //     bottom: shouldRotateLabels ? 80 : 20,
            //     left: isHorizontal ? 20 : 0
            // }
        },
        // Add responsive options for better label handling on different screen sizes
        responsive: [
            {
                breakpoint: 768,
                options: {
                    xaxis: {
                        labels: {
                            rotate: isHorizontal ? 0 : -90,
                            rotateAlways: !isHorizontal,
                            maxHeight: 100,
                        }
                    },
                    grid: {
                        padding: {
                            bottom: isHorizontal ? 20 : 100,
                            left: isHorizontal ? 30 : 0
                        }
                    }
                }
            }
        ],
        noData: getNoDataSettings()
    }
}

export default BarChart;