import React, { useState, useEffect } from 'react';
import { getPlansAndPricing } from '../data/db';

export default function PlansAndPricing() {
    const [pricingData, setPricingData] = useState(null);
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
    const [isLoading, setIsLoading] = useState(true);

    console.log("RENDER -> Pricing Component")

    useEffect(() => {
        getPlansAndPricing().then((data) => {
            setPricingData(data);
            setBillingCycle(data.billingCycle || 'monthly');
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 text-slate-400 text-sm animate-pulse">
                Loading pricing plans...
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    Flexible Plans for Every Stage
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Scale your API limits, active session allowances, and developer support seamlessly as your application grows.
                </p>

                {/* Monthly / Yearly Billing Toggle */}
                <div className="pt-4 flex items-center justify-center gap-3">
                    <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        Monthly Billing
                    </span>

                    <button
                        type="button"
                        onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                        className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-slate-700 transition-colors focus:outline-none"
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-blue-600 transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>

                    <span className={`text-sm font-medium flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                        Yearly Billing
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 rounded-full border border-emerald-200 dark:border-emerald-800">
                            Save 17%
                        </span>
                    </span>
                </div>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4">
                {pricingData.plans.map((plan) => {
                    const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;

                    return (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all bg-white dark:bg-slate-900 ${plan.isPopular
                                    ? 'border-2 border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-500/10 dark:shadow-blue-900/20 md:-translate-y-2'
                                    : 'border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                                    Most Popular
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* Plan Title & Tag */}
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                        {plan.name}
                                    </h2>
                                    {plan.isCurrent && (
                                        <span className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700">
                                            Current Plan
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[32px]">
                                    {plan.description}
                                </p>

                                {/* Price Display */}
                                <div className="pt-2 flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                        ${price}
                                    </span>
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                                    </span>
                                </div>

                                <hr className="border-slate-100 dark:border-slate-800 my-4" />

                                {/* Feature List */}
                                <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <svg
                                                className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2.5"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Button */}
                            <div className="pt-8">
                                <button
                                    disabled={plan.isCurrent}
                                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all ${plan.isCurrent
                                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                            : plan.isPopular
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 active:scale-[0.98]'
                                                : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 active:scale-[0.98]'
                                        }`}
                                >
                                    {plan.isCurrent ? 'Current Tier' : 'Upgrade Plan'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}