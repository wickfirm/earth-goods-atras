export interface PayoutSummaryItem {
    count: number;
    gross: number;
    fee: number;
    total: number;
    currency: string;

}

export interface PayoutSummary {
    Charges: PayoutSummaryItem;
    Refunds: PayoutSummaryItem;
    Adjustments: PayoutSummaryItem;
    Payouts: number;
    "Stripe Fees": PayoutSummaryItem;
}

export interface PaymentResponse {
    id: number;
    status: string;
    payment_status: string;
}

export interface Payout {
    id: number;
    amount: string;
    arrival_date: string;
    currency: string;
    payout_id: string;
    status: string;
    summary: PayoutSummary;
    paymentResponse: PaymentResponse;

}

export interface Customer {
    id: number;
    name: string;
    first_name: string | null;
    last_name: string | null;
    display_name: string | null;
}

export interface PayoutData {
    id: number;
    status: string;
    order_number: string;
    email: string;
    total_price: string;
    currency: string;
    created_at: string;
    payout: Payout;
    summary: PayoutSummary;
    transactions: Transaction[]
}

export interface PayoutResponse {
    data: PayoutData;
}


export interface TransactionSource {
    object: string;
    id: string;
    status: string;
}

export interface Transaction {
    transaction_id: string;
    type: string;
    amount: number;
    fee: number;
    net: number;
    created: string;
    currency: string;
    description: string;
    payment_intent_id: string | null;
    source: TransactionSource;
}
