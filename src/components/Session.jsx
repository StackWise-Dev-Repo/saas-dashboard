import React, { useState, useEffect } from 'react';
import { getActiveSessions } from '../data/db';

export default function Session() {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log("RENDER -> Session component")

    useEffect(() => {
        // Fetch initial sessions from mock database
        getActiveSessions().then((data) => {
            setSessions(data);
            setIsLoading(false);
        });
    }, []);

    // Handle revoking/terminating a specific session
    const handleRevokeSession = (sessionId) => {
        setSessions((prev) => prev.filter((s) => s.id !== sessionId));
    };

    // Handle logging out of all other sessions except current
    const handleRevokeAllOther = () => {
        setSessions((prev) => prev.filter((s) => s.isCurrentDevice));
    };

    if (isLoading) {
        return (
            <div className="p-6 text-slate-400 text-sm animate-pulse">
                Loading active sessions...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Active Sessions
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage devices currently signed into your account.
                    </p>
                </div>

                {sessions.length > 1 && (
                    <button
                        onClick={handleRevokeAllOther}
                        className="px-4 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-lg transition-colors border border-rose-200 dark:border-rose-900/50"
                    >
                        Log Out Other Sessions
                    </button>
                )}
            </div>

            {/* Session Count Banner */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
                    You are currently logged in on {sessions.length} browser{sessions.length > 1 ? 's' : ''}/device{sessions.length > 1 ? 's' : ''}.
                </span>
            </div>

            {/* Sessions List */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
                {sessions.map((session) => (
                    <div
                        key={session.id}
                        className="p-5 flex items-start justify-between gap-4 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                    >
                        <div className="flex items-start gap-4">
                            {/* Device Icon */}
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg">
                                {session.device.toLowerCase().includes('iphone') || session.device.toLowerCase().includes('mobile') ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>

                            {/* Session Details */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold text-slate-900 dark:text-white">
                                        {session.device}
                                    </span>
                                    {session.isCurrentDevice && (
                                        <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
                                            This Device
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {session.browser}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 pt-1">
                                    <span>IP: {session.ipAddress}</span>
                                    <span>•</span>
                                    <span>{session.location}</span>
                                    <span>•</span>
                                    <span>{session.lastActive}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action */}
                        {!session.isCurrentDevice && (
                            <button
                                onClick={() => handleRevokeSession(session.id)}
                                className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-900/50 rounded-lg transition-colors"
                            >
                                Revoke
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}