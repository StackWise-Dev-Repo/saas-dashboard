import React, { useState, useEffect } from 'react';
import { getDashboardData } from '../data/db';

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getDashboardData().then((data) => {
            setDashboardData(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 text-slate-400 text-sm animate-pulse">
                Loading dashboard metrics...
            </div>
        );
    }

    const { metrics, recentActivity, usageOverview } = dashboardData;

    // Find max value in API calls for bar chart scaling
    const maxCalls = Math.max(...usageOverview.apiCalls.map((item) => item.calls));

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Dashboard
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Welcome back, Alex. Here is an overview of your application metrics.
                    </p>
                </div>

                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors self-start sm:self-auto">
                    Generate API Key
                </button>
            </div>

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {metrics.map((metric) => (
                    <div
                        key={metric.id}
                        className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm space-y-2"
                    >
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            {metric.title}
                        </span>

                        <div className="flex items-baseline justify-between pt-1">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                {metric.value}
                            </span>

                            <span
                                className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${metric.isPositive
                                        ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/50'
                                        : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900/50'
                                    }`}
                            >
                                {metric.change}
                            </span>
                        </div>

                        <p className="text-[11px] text-slate-400 dark:text-slate-500">
                            {metric.timeframe}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Grid: Usage Chart & Activity Stream */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Usage Chart Bar Visual (2 Columns wide on Desktop) */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                API Volume Growth
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Monthly request distribution across all endpoints
                            </p>
                        </div>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                            2026 YTD
                        </span>
                    </div>

                    {/* Bar Chart Bars */}
                    <div className="pt-4 flex items-end justify-between gap-3 h-48">
                        {usageOverview.apiCalls.map((item, idx) => {
                            const heightPercent = Math.round((item.calls / maxCalls) * 100);
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-slate-500 dark:text-slate-400">
                                        {(item.calls / 1000).toFixed(0)}k
                                    </div>
                                    <div
                                        className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-t-lg transition-all duration-300"
                                        style={{ height: `${heightPercent}%` }}
                                    />
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                        {item.month}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Activity Feed (1 Column) */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        Recent Activity
                    </h2>

                    <div className="space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="pt-3 first:pt-0 flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                <div className="space-y-0.5">
                                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                        {activity.action}
                                    </p>
                                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                                        <span>{activity.user}</span>
                                        <span>•</span>
                                        <span>{activity.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}