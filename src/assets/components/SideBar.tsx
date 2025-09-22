// components/Sidebar.tsx
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// SVG Icons Components
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
  </svg>
);

const InventoryIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const SalesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const ReportsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const InventoryEngineIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LoanEngineIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BusinessAdvisorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const TechAdvisorIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  // ✅ Close sidebar when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scrolling when sidebar is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
      : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:transform hover:translate-x-1";

  const links = [
    { path: "/", label: "Dashboard", icon: <DashboardIcon /> },
    { path: "/inventory", label: "Inventory", icon: <InventoryIcon /> },
    { path: "/sales", label: "Sales", icon: <SalesIcon /> },
    { path: "/reports", label: "Reports", icon: <ReportsIcon /> },
    { path: "/inventory-engine", label: "Inventory Engine", icon: <InventoryEngineIcon /> },
    { path: "/loan-engine", label: "Loan Engine", icon: <LoanEngineIcon /> },
    { path: "/business-advisor", label: "Business Advisor", icon: <BusinessAdvisorIcon /> },
    { path: "/tech-advisor", label: "Tech Advisor", icon: <TechAdvisorIcon /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex-col fixed h-full z-30 shadow-2xl border-r border-slate-700">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">F</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">FinovatrAI</h1>
              <p className="text-xs text-blue-100 opacity-90">Financial Intelligence</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Main Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Main</h3>
            {links.slice(0, 4).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ease-in-out font-medium text-sm ${isActive(link.path)}`}
              >
                <span className="text-current">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* AI Engines Section */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">AI Engines</h3>
            {links.slice(4).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ease-in-out font-medium text-sm ${isActive(link.path)}`}
              >
                <span className="text-current">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900/50">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-medium">© {new Date().getFullYear()} FinovatrAI</p>
            <p className="text-xs text-slate-500 mt-1">Powered by AI</p>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black transition-all duration-300 ${
          isOpen ? "bg-opacity-50 visible" : "bg-opacity-0 invisible"
        }`}
        onClick={onClose}
      >
        <aside
          className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 w-72 h-full text-white transform transition-transform duration-300 ease-in-out shadow-2xl ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-6 border-b border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">F</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">FinovatrAI</h1>
                <p className="text-xs text-blue-100 opacity-90">Financial Intelligence</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-160px)]">
            {/* Main Section */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">Main</h3>
              {links.slice(0, 4).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ease-in-out font-medium text-sm ${isActive(link.path)}`}
                  onClick={onClose}
                >
                  <span className="text-current">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* AI Engines Section */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 px-3">AI Engines</h3>
              {links.slice(4).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ease-in-out font-medium text-sm ${isActive(link.path)}`}
                  onClick={onClose}
                >
                  <span className="text-current">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Footer */}
          <div className="p-4 border-t border-slate-700 bg-slate-900/50">
            <div className="text-center">
              <p className="text-xs text-slate-400 font-medium">© {new Date().getFullYear()} FinovatrAI</p>
              <p className="text-xs text-slate-500 mt-1">Powered by AI</p>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
