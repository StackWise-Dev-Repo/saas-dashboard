import React, { useState, useEffect } from 'react';
import { getUserSettings } from '../data/db';

export default function SettingsComp() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Form State
  const [settings, setSettings] = useState({
    profile: { fullName: '', email: '', timezone: '', twoFactorEnabled: false },
    notifications: { emailAlerts: false, productUpdates: false, securityAlerts: false, weeklySummary: false },
    appearance: { theme: 'dark', compactMode: false },
  });

  console.log("RENDER -> Settings Component")

  useEffect(() => {
    getUserSettings().then((data) => {
      setSettings(data);
      setIsLoading(false);
    });
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      profile: { ...prev.profile, [name]: value },
    }));
  };

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-slate-400 text-sm animate-pulse">
        Loading settings...
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'appearance', label: 'Appearance' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal profile, notification preferences, and system appearance.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          {isSaved ? (
            <>
              <svg className="w-4 h-4 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Saved!</span>
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        {/* 1. PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Personal Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={settings.profile.fullName}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Timezone
                </label>
                <select
                  name="timezone"
                  value={settings.profile.timezone}
                  onChange={handleProfileChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="UTC-7 (Pacific Time)">UTC-7 (Pacific Time)</option>
                  <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                  <option value="UTC+5:30 (IST)">UTC+5:30 (IST)</option>
                  <option value="UTC+5 (PKT)">UTC+5 (PKT)</option>
                </select>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                  Two-Factor Authentication (2FA)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Secure your account using TOTP or SMS verification.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('profile', 'twoFactorEnabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.profile.twoFactorEnabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.profile.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* 2. NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Email Notifications
            </h2>

            <div className="space-y-4">
              {[
                { key: 'emailAlerts', title: 'Critical System Alerts', desc: 'Receive urgent emails regarding account security or downtime.' },
                { key: 'productUpdates', title: 'Product & Feature Updates', desc: 'Get news about major feature releases and platform changes.' },
                { key: 'securityAlerts', title: 'New Device Logins', desc: 'Alert when a new browser or IP signs into your account.' },
                { key: 'weeklySummary', title: 'Weekly Performance Report', desc: 'A consolidated weekly digest of API usage and analytics.' },
              ].map(({ key, title, desc }) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('notifications', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications[key] ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications[key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. APPEARANCE */}
        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Theme & Display
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
                Interface Theme
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['light', 'dark', 'system'].map((themeMode) => (
                  <button
                    key={themeMode}
                    type="button"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        appearance: { ...prev.appearance, theme: themeMode },
                      }))
                    }
                    className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 capitalize text-sm font-medium transition-all ${settings.appearance.theme === themeMode
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                  >
                    {themeMode}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800 my-6" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Compact Mode</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Reduce padding across tables and sidebar components to fit more content.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('appearance', 'compactMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.appearance.compactMode ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}