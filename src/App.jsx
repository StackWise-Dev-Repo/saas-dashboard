import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  CreditCard,
  BarChart3,
  Activity,
  Settings,
  LogOut,
  ChevronRight,
  ShieldAlert,
  Bell,
  MailClock,
  Trophy,
  AlertTriangle,
  InfoIcon,
} from 'lucide-react';
import { useAuthContext } from './context/AuthContext';
import UserLogin from './components/UserLogin';
import Dashboard from './components/Dashboard';
import PlansAndPricing from './components/PlansAndPricing';
import Usage from './components/Usage';
import Session from './components/Session';
import SettingsComp from './components/SettingsComp';

export default function AppLayout() {

  const [activeTab, setActiveTab] = useState('dashboard');
  const {session, removeSession} = useAuthContext();
  const [notificationsToggle, setNotificationsToggle] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    return [
      {
        "id": 888737988344,
        "status": "PENDING",
        "heading": "Current Month Announcements!",
        "content": "We are currently improving the dashboard working procedure to the advanced level."
      },
      {
        "id": 888737988345,
        "status": "SUCCESS",
        "heading": "System Update Complete",
        "content": "All core modules have been successfully upgraded to the latest version. Performance is now optimized."
      },
      {
        "id": 888737988346,
        "status": "ALERT",
        "heading": "Security Alert: New Login",
        "content": "A new login attempt was detected from an unrecognized device in London, UK. Please verify your account."
      },
      {
        "id": 888737988347,
        "status": "INFO",
        "heading": "Weekly Report Available",
        "content": "Your workspace performance data for last week is ready. Click here to download the PDF report."
      }
    ]
  })

  // Navigation Items Config
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, 'comp': <Dashboard /> },
    { id: 'plans', label: 'Plans & Pricing', icon: CreditCard, 'comp': <PlansAndPricing /> },
    { id: 'usage', label: 'API Usage', icon: BarChart3, 'comp': <Usage /> },
    { id: 'sessions', label: 'Active Sessions', icon: Activity, 'comp': <Session /> },
    { id: 'settings', label: 'Settings', icon: Settings, 'comp': <SettingsComp /> },
  ];

  if(Object.keys(session).length === 0) return <UserLogin />

  // User State Mock
  const user = {
    email: session.email,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
  };

  const sessionLogoutHandler = (email) => {
    removeSession(email);
  }

  const menuClickHandler = (menu) => {
    setActiveTab(menu);
    const url = new URL(window.location.href);
    const origin = url.origin 
    window.history.pushState({}, '', menu === 'dashboard' ? origin: origin + `/app/${menu}` );
  }


  return (
    <div className="flex h-screen w-screen bg-slate-950  text-slate-100 font-sans overflow-hidden">
      {/* ================= LEFT PANEL (40% Width) ================= */}
      <aside className="w-[20%] min-w-xs h-full bg-slate-900/80 border-r border-slate-800/80 flex flex-col justify-between p-6 backdrop-blur-md relative z-10">

        {/* Top Header / Branding */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-wide">Pulse SaaS</h1>
              <p className="text-xs text-slate-400">Developer Dashboard</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => menuClickHandler(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all relative ${isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                >
                  {/* Active Tab Background Animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-indigo-600/20 border border-indigo-500/30 rounded-xl"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}

                  <div className="flex items-center gap-3 relative z-10">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-indigo-400 relative z-10" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer User Section */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          {/* User Profile Card */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/50">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-9 h-9 rounded-lg object-cover ring-2 ring-indigo-500/20"
              />
              <div className="min-w-0">
                <p className="text-xs text-slate-400 truncate">Logged in as</p>
                <p className="text-xs font-semibold text-slate-200 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => sessionLogoutHandler(session.email)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 border border-transparent transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ================= RIGHT MAIN DASHBOARD (60% Width) ================= */}
      <main className="w-[80%] h-full bg-slate-950 p-8 flex flex-col justify-between overflow-y-auto">

        {/* Dynamic Route Indicator */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
                {activeTab} View
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Active Route: <code className="text-indigo-400 font-mono">/app/{activeTab}</code>
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 relative">
            <button onClick={() => setNotificationsToggle(!notificationsToggle)} className="p-2.5 rounded-xl bg-slate-900 border relative border-slate-800 text-slate-400 hover:text-white transition">
              {notifications.length > 0 && <span className='bg-red-600 w-2 h-2 rounded-full absolute top-0 right-0'></span>}
              <Bell className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition">
              <ShieldAlert className="w-4 h-4" />
            </button>

            {notificationsToggle && (
              <div className='absolute top-11 right-0 p-4 rounded-lg border bg-slate-900 border-slate-800'>
                <motion.div
                  className='overflow-auto scrollbar-thin scrollbar-thumb-slate-900 pr-2 scrollbar-track-slate-800'
                  initial={{width: '500px', height: '0px', opacity: 0}}
                  animate={{ height: '180px', opacity: 1 }}
                  exit={{ height: '0px', opacity: 0 }}
                  transition={
                    {
                      duration: 0.2
                    }
                  }
                >
                  {
                    notifications.length > 0 && notifications.map(notification => (
                      <div key={notification.id} className={`wrapper hover:scale-[0.99] transition-all cursor-pointer my-2 border rounded-lg py-2 px-4 ${notification.status === 'PENDING' && 'border-red-400'} ${notification.status === 'SUCCESS' && 'border-green-400'} ${notification.status === 'INFO' && 'border-blue-400'} ${notification.status === 'ALERT' && 'border-orange-400'}`}>
                        {/* PENDING SUCCESS ALRET INFO */}
                        <div className="flex gap-3 align-middle items-center justify-between">
                          { notification.status === 'PENDING' && <MailClock color='red' /> }
                          { notification.status === 'SUCCESS' && <Trophy color='green' /> }
                          { notification.status === 'ALERT' && <AlertTriangle color='orange' /> }
                          { notification.status === 'INFO' && <InfoIcon color='skyblue' /> }
                          <div className="container">
                            <h2 className='font-semibold text-md text-left color-white-300'>{notification.heading}</h2>
                            <p className='text-sm'>{notification.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </motion.div>
              </div>
            )}
          </div>
        </div>

        {/* Empty Canvas Placeholder */}
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-800/80 rounded-2xl my-6 bg-slate-900/20">
            {menuItems.map(item => {
              const isActive = activeTab === item.id;

              return (
                <div key={item.id}>
                  {
                    isActive ? (
                      item.comp
                    ): ''
                  }
                </div>
              )
            })}
        </div>

        {/* Footer Status */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>System Operational</span>
          </div>
          <span>v2.4.0</span>
        </div>
      </main>
    </div>
  );
}