import React, { useState, useMemo } from 'react';
import { User, ShieldAlert, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CardNav from './CardNav.jsx';
import { gymConfig } from '../../config/gymConfig.js';
import { useAuth } from '../../context/AuthContext.jsx';
import batronLogo from '../../assets/batron-logo-clean.png';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = useMemo(
    () => [
      {
        label: 'Train',
        bgColor: '#160b0c',
        textColor: '#ffffff',
        links: [
          { label: 'Programs', to: '/programs', ariaLabel: 'Athletic Programs' },
          { label: 'Schedule', to: '/schedule', ariaLabel: 'Class Schedule' },
          { label: 'Trainers', to: '/trainers', ariaLabel: 'Expert Coaches' }
        ]
      },
      {
        label: 'Community',
        bgColor: '#121019',
        textColor: '#ffffff',
        links: [
          { label: 'About Us', to: '/about', ariaLabel: 'About Batron Gym' },
          { label: 'Club Gallery', to: '/gallery', ariaLabel: 'Facility Gallery' },
          { label: 'Athletic Blog', to: '/blog', ariaLabel: 'Fitness Blog' }
        ]
      },
      {
        label: 'Access',
        bgColor: '#1e0e09',
        textColor: '#ffffff',
        links: [
          { label: 'Membership', to: '/membership', ariaLabel: 'Membership Plans' },
          { label: 'Contact Us', to: '/contact', ariaLabel: 'Contact Sanctuary' },
          isAuthenticated
            ? { label: `Member Portal (${user?.name?.split(' ')[0] || 'User'})`, to: '/member', ariaLabel: 'Member Portal' }
            : { label: 'Sign In', to: '/login', ariaLabel: 'Member Sign In' }
        ]
      }
    ],
    [isAuthenticated, user?.name]
  );

  const actions = (
    <div className="flex items-center gap-2">
      {/* User profile dropdown if authenticated */}
      {isAuthenticated && (
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-medium transition-all"
          >
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
              }
              alt={user?.name}
              className="w-5 h-5 rounded-full object-cover border border-[#ff3c00]"
            />
            <span className="max-w-[70px] truncate hidden md:inline">{user?.name}</span>
            <ChevronDown className="w-3 h-3 text-white/80" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#0e1017]/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl py-2 z-50">
              <div className="px-4 py-2 border-b border-white/10">
                <p className="text-[11px] text-zinc-400">Signed in as</p>
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              </div>

              <Link
                to="/member"
                onClick={() => setUserDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/10"
              >
                <User className="w-3.5 h-3.5 text-[#ff3c00]" />
                Member Portal
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-amber-400 hover:bg-white/10"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Admin Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={() => {
                  setUserDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 text-left transition-colors border-t border-white/10 mt-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <CardNav
      logo={batronLogo}
      logoAlt="Batron Gym Logo"
      brandTitle={gymConfig.brandDisplayName || gymConfig.name}
      items={navItems}
      baseColor="rgba(11, 11, 17, 0.94)"
      menuColor="#ffffff"
      buttonBgColor="#ff3c00"
      buttonTextColor="#ffffff"
      ctaText={isAuthenticated ? "Portal" : "Join Now"}
      ctaLink={isAuthenticated ? "/member" : "/membership"}
      actions={actions}
      ease="power3.out"
    />
  );
};

export default Navbar;
