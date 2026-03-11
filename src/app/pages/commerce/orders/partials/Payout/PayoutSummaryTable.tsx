import React from 'react';
import {PayoutData, PayoutSummaryItem, Transaction} from "../../../../../models/commerce/Payout.ts";

interface PayoutSummaryTableProps {
    data: PayoutData;
    customerEmail: string
}

const PayoutSummaryTable: React.FC<PayoutSummaryTableProps> = ({data, customerEmail}) => {


    const formatCurrency = (amount: number | string, currency: string = 'AED') => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(numAmount);
    };


    const renderSummaryRow = (
        label: string,
        data: PayoutSummaryItem,
    ) => (
        <tr key={label} className="">
            <td>
                <span className="font-medium">{label}</span>
            </td>
            <td>
        <span className="badge badge-light-info">
          {data.count}
        </span>
            </td>
            <td>
        <span>
          {formatCurrency(data.gross, data.currency)}
        </span>
            </td>
            <td>
        <span>
          {formatCurrency(data.fee, data.currency)}
        </span>
            </td>
            <td>
        <span>
          {formatCurrency(data.total, data.currency)}
        </span>
            </td>
        </tr>
    );


    const renderTransactionRow = (transaction: Transaction, index: number) => (
        transaction.type !== 'payout' && (
            <tr key={`transaction-${index}-${transaction.transaction_id}`}>
                <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
                <td>{formatCurrency(transaction.amount, transaction.currency)}</td>
                <td>{formatCurrency(transaction.fee, transaction.currency)}</td>
                <td>{formatCurrency(transaction.net, transaction.currency)}</td>
                <td>
                    {transaction.description}

                </td>
                <td>
                    {new Date(transaction.created).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </td>
            </tr>
        )

    );

    return (
        <>
            <div
                className="card card-flush py-4 flex-row-fluid position-relative">
                <div className="card-body pt-0">
                    <div className="py-4 border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payout Summary</h1>
                        <p className="text-gray-600">Financial breakdown</p>
                    </div>
                    <div className="overflow-x-auto">
                        <div className="table-responsive">
                            <table className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                                <thead>
                                <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                    <th className="min-w-100px">
                                        Transaction Type
                                    </th>
                                    <th className="min-w-100px">
                                        Count
                                    </th>
                                    <th className="min-w-100px">
                                        Gross
                                    </th>
                                    <th className="min-w-100px">
                                        Fee
                                    </th>
                                    <th className="min-w-100px">
                                        Total
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="fw-semibold text-gray-600">
                                {renderSummaryRow('Charges', data.summary.Charges)}
                                {renderSummaryRow('Refunds', data.summary.Refunds)}
                                {renderSummaryRow('Adjustments', data.summary.Adjustments)}
                                {renderSummaryRow('Stripe Fees', data.summary["Stripe Fees"])}

                                {/* Payout Row */}
                                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="fw-semibold text-gray-600">
                                        Payouts
                                    </td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>
                                        {data.summary.Payouts < 0 ?
                                            formatCurrency(data?.summary.Payouts * (-1), data.currency)
                                        :
                                            formatCurrency(data?.summary.Payouts , data.currency)
                                        }
                                        </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <div
                className="card card-flush my-4 flex-row-fluid position-relative">
                <div className="card-body ">
                    {data.transactions && data.transactions.length > 0 && (
                        <div className="">
                            <div className="py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Individual Transactions</h2>
                            <p className="text-sm text-gray-600 mt-1">Detailed breakdown of all transactions</p>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="table-responsive">
                                <table className="table align-middle table-row-dashed fs-6 gy-5 mb-0">
                                    <thead>
                                    <tr className="text-start text-gray-500 fw-bold fs-7 text-uppercase gs-0">
                                        <th className="min-w-100px">
                                            Type
                                        </th>
                                        <th className="min-w-100px">
                                            Gross
                                        </th>
                                        <th className="min-w-100px">
                                            Fee
                                        </th>
                                        <th className="min-w-100px">
                                            Total
                                        </th>
                                        <th className="min-w-100px">
                                            Description
                                        </th>
                                        <th className="min-w-100px">
                                            Date
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody className="fw-semibold text-gray-600">
                                    {data && data.transactions && data.transactions.length > 0 && data.transactions.map((transaction, index) => renderTransactionRow(transaction, index))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                )}

            </div>
            </div>
        </>


    );
};

export default PayoutSummaryTable;