// components/Header.tsx
import finovatrai_logo from "../images/fin_logo.png";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Button */}
        <button 
          onClick={onMenuClick}
          className="md:hidden text-gray-600 focus:outline-none mr-2"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <img src={finovatrai_logo} alt="Logo" className="h-10" />
        <h1 className="text-xl font-semibold text-gray-800">FinovatrAI</h1>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-gray-600">Hello, User</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="user avatar"
          className="rounded-full border"
        />
      </div>
    </header>
  );
}