import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import { Navbar } from './components/common/Navbar.jsx';
import { Footer } from './components/common/Footer.jsx';
import { ProtectedRoute } from './components/common/ProtectedRoute.jsx';

// Pages
import { HomePage } from './pages/HomePage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ProgramsPage } from './pages/ProgramsPage.jsx';
import { ProgramDetailPage } from './pages/ProgramDetailPage.jsx';
import { MembershipPage } from './pages/MembershipPage.jsx';
import { SchedulePage } from './pages/SchedulePage.jsx';
import { TrainersPage } from './pages/TrainersPage.jsx';
import { TrainerDetailPage } from './pages/TrainerDetailPage.jsx';
import { GalleryPage } from './pages/GalleryPage.jsx';
import { BlogPage } from './pages/BlogPage.jsx';
import { BlogDetailPage } from './pages/BlogDetailPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.jsx';
import { MemberPortal } from './pages/MemberPortal.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col bg-[#08080a] text-slate-100 font-sans selection:bg-[#ff4612] selection:text-white">
            
            {/* Global Sticky Responsive Navbar */}
            <Navbar />

            {/* Main Application Routes */}
            <main className="flex-grow">
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/:slug" element={<ProgramDetailPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/trainers" element={<TrainersPage />} />
                <Route path="/trainers/:slug" element={<TrainerDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                
                {/* Auth Pages */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Member Portal (Protected) */}
                <Route
                  path="/member"
                  element={
                    <ProtectedRoute>
                      <MemberPortal />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/member/*"
                  element={
                    <ProtectedRoute>
                      <MemberPortal />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Portal (Protected Role) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback 404 Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

          </div>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
