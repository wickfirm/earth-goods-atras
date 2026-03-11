import numeral from 'numeral';
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils';

export enum LabelTooltipFormatting {
    MoneyAbbreviated, // e.g., 10M, 20.25K
    MoneyFull, // 1,200.45
    Percentage, // e.g. 45%
    NoFormatting // in case we have a value other than money and we need to keep the same
}

export enum LineCurveStyle {
    SMOOTH = 'smooth',
    STRAIGHT = 'straight',
    STEPLINE = 'stepline'
}

export enum LegendPosition {
    TOP = 'top',
    RIGHT = 'right',
    LEFT = 'left',
    BOTTOM = 'bottom'
}

export const getLabelColor = () => {
    return getCSSVariableValue('--bs-gray-500');
}

export const getBorderColor = () => {
    return getCSSVariableValue('--bs-gray-200');
}

export const getColors = (isDonut: boolean = false) => {
    const dangerColor = getCSSVariableValue('--bs-danger');
    let secondaryColor = getCSSVariableValue('--bs-gray-300');
    const primaryColor = getCSSVariableValue('--bs-primary');
    const successColor = getCSSVariableValue('--bs-success');
    const warningColor = getCSSVariableValue('--bs-warning');
    const infoColor = getCSSVariableValue('--bs-info');

    if (isDonut) {
        secondaryColor = getCSSVariableValue('--bs-krys');
    }

    return [infoColor, secondaryColor, successColor, primaryColor, dangerColor, warningColor, '#3F51B5',
        '#FF9800',
        '#4CAF50',
        '#9C27B0',
        '#E91E63',
        '#607D8B',
        '#795548',
        '#F44336',
        '#009688',
        '#CDDC39',
        '#00BCD4',
        '#8BC34A',
        '#FF5722'];
}

export const getLightColors = () => {
    const dangerColor = getCSSVariableValue('--bs-danger-light');
    const secondaryColor = getCSSVariableValue('--bs-gray-200');
    const primaryColor = getCSSVariableValue('--bs-primary-light');
    const successColor = getCSSVariableValue('--bs-success-light');
    const warningColor = getCSSVariableValue('--bs-warning-light');
    const infoColor = getCSSVariableValue('--bs-info-light');

    return [infoColor, secondaryColor, successColor, primaryColor, dangerColor, warningColor];
}

export const getTooltipFormatter = (val: number, style: LabelTooltipFormatting, currency: string = '') => {
    // for the tooltip, we are 100% val is a number because this is a chart
    if (style === LabelTooltipFormatting.MoneyFull) {
        // we need to show the money values in full
        return currency + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    } else if (style === LabelTooltipFormatting.MoneyAbbreviated) {
        return currency + ' ' + numeral(val).format('0.00a').toUpperCase();
    } else if (style === LabelTooltipFormatting.Percentage) {
        return `${val}%`;
    }

    // no formatting, we return as is
    return val.toString();
}

export const getLabelFormatter = (val: any, style: LabelTooltipFormatting, currency: string = '') => {
    // this is a label so val can be a string
    if (Number.isInteger(val)) {
        // if it's a number, then we may apply LabelTooltipFormatting
        return getTooltipFormatter(val, style, currency);
    } else {
        // we cannot apply any formatting, we just return
        return val;
    }
}

export const getNoDataSettings = (): ApexNoData => {
    return {
        text: "No data to display",
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            color: "red",
            fontSize: '14px',
            fontFamily: undefined
        }
    }
}