import {Response} from '../../../_metronic/helpers';

export type Sales = {
    totalSales: number,
    totalOrders: number,
    aov: number,
    totalUnitsSold: number,
    newCustomers: number,
    totalCustomers: number,
    aof: number,
    labels: string[],
    series: any,
    lowLabels: string[],
    lowSeries: any,
    categorySalesLabels: string[],
    categorySalesSeries: number[],
    conversionRate: number,
    cartAbandonmentRate: number,
    checkoutAbandonmentRate: number,
    dailySalesLabels: string[],
    dailySalesSeries: any,
};

export type SalesPaginate = Response<Sales[]>;