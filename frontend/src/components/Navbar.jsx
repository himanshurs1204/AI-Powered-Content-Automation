// src/components/Navbar.jsx
// Navigation bar component
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    if (!user) {
        return null;
    }

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <span className="text-2xl">🤖</span>
                        <span className="font-bold text-xl text-primary hidden sm:block">
                            Content AI
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavLink to="/dashboard" isActive={isActive('/dashboard')}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/saved-content" isActive={isActive('/saved-content')}>
                            Saved
                        </NavLink>
                        <NavLink to="/content-calendar" isActive={isActive('/content-calendar')}>
                            Calendar
                        </NavLink>
                    </div>

                    {/* User Info & Logout */}
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-700 hidden sm:block">{user?.name}</span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children, isActive }) => (
    <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition ${isActive
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
    >
        {children}
    </Link>
);
