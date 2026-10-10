import React, { useState, useEffect } from 'react';
import { getUsageData } from '../data/db';

export default function Usage() {
    const [usageData, setUsageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    console.log("RENDER -> Usage Component")

    useEffect(() => {
        getUsageData().then((data) => {
            setUsageData(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 text-slate-400 text-sm animate-pulse">
                Loading usage analytics...
            </div>
        );
    }

    // Helper for color coding usage progress bars
    const getProgressColor = (percentage) => {
        if (percentage >= 85) return 'bg-rose-500';
        if (percentage >= 70) return 'bg-amber-500';
        return 'bg-blue-600';
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Usage & Quotas
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Monitor resource usage for period: <span className="font-semibold text-slate-700 dark:text-slate-300">{usageData.currentPeriod}</span>
                    </p>
                </div>

                <button className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors self-start sm:self-auto">
                    Upgrade Quota
                </button>
            </div>

            {/* Quota Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {usageData.metrics.map((metric, index) => (
                    <div
                        key={index}
                        className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-3"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {metric.category}
                            </span>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                {metric.percentage}% Used
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(metric.percentage)}`}
                                style={{ width: `${metric.percentage}%` }}
                            />
                        </div>

                        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 pt-1">
                            <span>
                                <strong className="text-slate-800 dark:text-slate-200">{metric.used.toLocaleString()}</strong> {metric.unit}
                            </span>
                            <span>Limit: {metric.limit.toLocaleString()} {metric.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Breakdown Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Top Consuming Endpoints
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400">Last 30 days</span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                    {[
                        { endpoint: '/api/v1/checkout/extensions', calls: 142800, latency: '82ms', status: '200 OK' },
                        { endpoint: '/api/v1/graphql/storefront', calls: 110450, latency: '124ms', status: '200 OK' },
                        { endpoint: '/api/v1/products/inventory', calls: 64100, latency: '45ms', status: '200 OK' },
                        { endpoint: '/api/v1/auth/sessions', calls: 24800, latency: '60ms', status: '200 OK' },
                    ].map((item, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <div className="space-y-0.5">
                                <span className="font-mono text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50">
                                    GET
                                </span>
                                <span className="ml-2 font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                                    {item.endpoint}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                                <span><strong className="text-slate-700 dark:text-slate-300">{item.calls.toLocaleString()}</strong> calls</span>
                                <span className="hidden sm:inline">Avg: {item.latency}</span>
                                <span className="px-2 py-0.5 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 rounded border border-emerald-200 dark:border-emerald-800">
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}