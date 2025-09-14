// components/Sidebar.tsx
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      ? "bg-green-700 text-white"
      : "text-gray-200 hover:bg-green-600";

  const links = [
    { path: "/", label: "📊 Dashboard" },
    { path: "/inventory", label: "📦 Inventory" },
    { path: "/sales", label: "📦 Sales" },
    { path: "/reports", label: "💰 Reports" },
    { path: "/inventory-engine", label: "🛒 Inventory Engine" },
    { path: "/loan-engine", label: "🏦 Loan Engine" },
    { path: "/business-advisor", label: "🚀 Business Advisor" },
    { path: "/tech-advisor", label: "⚙️ Tech Advisor" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-green-800 text-white flex-col fixed h-full z-30">
        <div className="p-4 text-2xl font-bold border-b border-green-700">
          FinovatrAI
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded transition-colors duration-200 ${isActive(link.path)}`}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-green-600 my-2" />
          {links.slice(4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2 rounded transition-colors duration-200 ${isActive(link.path)}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-green-700 text-sm text-gray-300">
          © {new Date().getFullYear()} FinovatrAI
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
          className={`bg-green-800 w-64 h-full p-4 text-white transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">FinovatrAI</div>
            <button
              onClick={onClose}
              className="text-white p-1 rounded-full hover:bg-green-700"
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
          <nav className="space-y-2 overflow-y-auto h-[calc(100%-80px)]">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded transition-colors duration-200 ${isActive(
                  link.path
                )}`}
                onClick={onClose} // ✅ close after navigation
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 mt-4 border-t border-green-700 text-sm text-gray-300">
            © {new Date().getFullYear()} FinovatrAI
          </div>
        </aside>
      </div>
    </>
  );
}
