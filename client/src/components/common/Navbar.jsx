import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, User, ShieldAlert, LogOut, ChevronDown } from 'lucide-react';
import { gymConfig } from '../../config/gymConfig.js';
import { useAuth } from '../../context/AuthContext.jsx';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Membership', path: '/membership' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080a]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff5e28] to-[#ff4612] flex items-center justify-center shadow-lg shadow-[#ff4612]/30 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl tracking-wider text-white uppercase group-hover:text-[#ff4612] transition-colors">
                {gymConfig.name}
              </span>
              <span className="text-[10px] tracking-widest text-[#ff6b3d] font-bold uppercase -mt-1">
                {gymConfig.brandDisplayName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 rounded ${
                    active
                      ? 'text-[#ff4612] bg-[#ff4612]/10 border-b-2 border-[#ff4612]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & Auth */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-colors"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user?.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#ff4612]"
                  />
                  <span className="font-medium text-xs max-w-[100px] truncate">{user?.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#121218] border border-white/10 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#ff4612]/20 text-[#ff6b3d]">
                        {user?.role === 'admin' ? 'Administrator' : `${user?.membership?.planName || 'Basic'} Member`}
                      </span>
                    </div>

                    <Link
                      to="/member"
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5"
                    >
                      <User className="w-4 h-4 text-[#ff4612]" />
                      Member Portal
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-amber-400 hover:bg-white/5"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 text-left transition-colors border-t border-white/10 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-white px-3 py-2 transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/membership"
              className="btn-primary text-xs !py-2.5 !px-5"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/membership"
              className="btn-primary text-xs !py-1.5 !px-3 sm:hidden"
            >
              Join
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#ff4612]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Full-Screen / Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0a0e] border-b border-white/10 px-6 pt-4 pb-8 mt-3 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 px-3 text-sm font-bold uppercase tracking-wider rounded transition-colors ${
                    active
                      ? 'text-[#ff4612] bg-[#ff4612]/15 border-l-4 border-[#ff4612]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/10 mt-2 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/member"
                    className="flex items-center gap-2 text-sm font-bold text-white py-2 px-3 rounded bg-white/5"
                  >
                    <User className="w-4 h-4 text-[#ff4612]" />
                    Member Portal ({user?.name})
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 text-sm font-bold text-amber-400 py-2 px-3 rounded bg-amber-500/10"
                    >
                      <ShieldAlert className="w-4 h-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm font-bold text-red-400 py-2 px-3 text-left hover:bg-red-500/10 rounded"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="btn-outline text-center text-sm !py-2.5"
                >
                  Sign In
                </Link>
              )}

              <Link
                to="/membership"
                className="btn-primary text-center text-sm !py-3"
              >
                Join Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
