// components/Header.tsx
import { useState } from "react";
import finovatrai_logo from "../images/fin_logo.png";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 backdrop-blur-sm border-b border-slate-200/60 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          {/* Mobile Hamburger Button */}
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-white/50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={finovatrai_logo} alt="FinovatrAI Logo" className="h-10 w-10 rounded-lg shadow-md" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                FinovatrAI
              </h1>
              <p className="text-xs text-slate-500 font-medium">Business Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-slate-200/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
            <svg className="w-4 h-4 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none text-sm w-48"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg text-slate-600 hover:bg-white/50 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5l-5-5h5V3h0a7 7 0 0114 0v14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full border border-white"></div>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-3 hover:bg-slate-50/50 transition-colors duration-150">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-slate-700">New sales report generated</p>
                        <p className="text-xs text-slate-500">2 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50/50 transition-colors duration-150">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-slate-700">Inventory update completed</p>
                        <p className="text-xs text-slate-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-slate-50/50 transition-colors duration-150">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-slate-700">Monthly targets achieved</p>
                        <p className="text-xs text-slate-500">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-slate-100">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-semibold text-slate-800">John Doe</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="User avatar"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200/60 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">John Doe</p>
                  <p className="text-xs text-slate-500">john.doe@finovatra.ai</p>
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50/50 transition-colors duration-150">
                    <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50/50 transition-colors duration-150">
                    <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50/50 transition-colors duration-150">
                    <svg className="w-4 h-4 mr-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help & Support
                  </button>
                </div>
                <div className="border-t border-slate-100 py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50/50 transition-colors duration-150">
                    <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-6 pb-4">
        <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-slate-200/50 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
          <svg className="w-4 h-4 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-slate-700 placeholder-slate-400 focus:outline-none text-sm flex-1"
          />
        </div>
      </div>
    </header>
  );
}