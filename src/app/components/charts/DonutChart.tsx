import {ApexOptions} from 'apexcharts';
import React, {useRef} from 'react';
import {
    getColors,
    getNoDataSettings,
    getTooltipFormatter,
    LabelTooltipFormatting,
    LegendPosition
} from '../../helpers/charts';
import Chart from './Chart';

type Props = {
    series: ApexNonAxisChartSeries,
    labels: string[],
    className?: string,
    withGrouping?: boolean,
    legendPosition?: LegendPosition,
    valueFormatting?: LabelTooltipFormatting,
    currency?: string,
    title?: string,
    description?: string
}

const DonutChart: React.FC<Props> = ({
                                         series,
                                         labels,
                                         className = '',
                                         withGrouping = false,
                                         legendPosition = LegendPosition.BOTTOM,
                                         valueFormatting = LabelTooltipFormatting.NoFormatting,
                                         currency = '',
                                         title,
                                         description
                                     }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);

    return (
        <Chart chartRef={chartRef} cardClassName={className}
               getChartOptions={getChartOptions}
               getChartOptionsArgs={[series, labels, withGrouping, legendPosition, valueFormatting, currency]}
               refreshDeps={[series, labels]}
               title={title}
               description={description}/>
    )
}

function getChartOptions(series: ApexNonAxisChartSeries, labels: string[], withGrouping: boolean, legendPosition: LegendPosition, valueFormatting: LabelTooltipFormatting, currency: string): ApexOptions {
    const comparator = (a: number, b: number) => b - a;

    // if we only have 6 categories in total then we don't need to merge anything because we are already at limit
    if (withGrouping && series.length > 6) {
        // we need to keep only 5 categories and 1 Other in series which means we keep the top 5 and merge the rest into one Other category
        let newSeries: number[] = [];
        let newLabels: string[] = [];
        let totalGrouped: number = 0;

        // first we sort the series array in descending order to make sure we're only keeping the top 5
        let sortedSeries: number[] = [...series];
        let sortedLabels: string[] = [...labels];

        sortedSeries.sort(comparator);
        sortedLabels.sort((a, b) => comparator(series[labels.indexOf(a)], series[labels.indexOf(b)]));

        sortedSeries.forEach((dataPoint, index) => {
            if (index < 5) {
                newSeries.push(dataPoint);
                newLabels.push(sortedLabels[index]);
            } else {
                // group the rest together
                totalGrouped += dataPoint;
            }
        });

        if (totalGrouped > 0) {
            newSeries.push(totalGrouped);
            newLabels.push('Other');
        }

        series = [...newSeries];
        labels = [...newLabels];
    }

    return {
        series: series,
        labels: labels,
        chart: {
            height: 400,
            type: 'donut',
        },
        legend: {
            show: true,
            position: legendPosition
        },
        dataLabels: {
            enabled: true
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value) {
                    return getTooltipFormatter(value, valueFormatting, currency);
                }
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: legendPosition
                }
            }
        }],
        colors: getColors(true),
        noData: getNoDataSettings()
    }
}

export default DonutChart;