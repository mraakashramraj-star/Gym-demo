// Client API Service Layer
const BASE_URL = '/api';

export const getAuthToken = () => localStorage.getItem('gym_token');
export const setAuthToken = (token) => localStorage.setItem('gym_token', token);
export const removeAuthToken = () => localStorage.removeItem('gym_token');

export async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on [${endpoint}]:`, err.message);
    throw err;
  }
}

export const api = {
  // Auth
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
  updateProfile: (body) => request('/auth/profile', { method: 'PUT', body: JSON.stringify(body) }),
  addProgress: (body) => request('/auth/progress', { method: 'POST', body: JSON.stringify(body) }),

  // Classes & Schedule
  getClasses: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/classes${qs ? '?' + qs : ''}`);
  },
  getClassById: (id) => request(`/classes/${id}`),

  // Bookings
  bookClass: (body) => request('/bookings', { method: 'POST', body: JSON.stringify(body) }),
  getMyBookings: () => request('/bookings/my-bookings'),
  cancelBooking: (id) => request(`/bookings/${id}/cancel`, { method: 'PUT' }),
  getAllBookings: () => request('/bookings/all'),

  // Trainers
  getTrainers: () => request('/trainers'),
  getTrainerBySlug: (slug) => request(`/trainers/${slug}`),

  // Programs
  getPrograms: () => request('/programs'),
  getProgramBySlug: (slug) => request(`/programs/${slug}`),

  // Memberships & Payments
  getTiers: () => request('/memberships/tiers'),
  createOrder: (body) => request('/memberships/create-order', { method: 'POST', body: JSON.stringify(body) }),
  verifyPayment: (body) => request('/memberships/verify-payment', { method: 'POST', body: JSON.stringify(body) }),

  // Blog
  getBlogPosts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/blog${qs ? '?' + qs : ''}`);
  },
  getBlogPostBySlug: (slug) => request(`/blog/${slug}`),

  // Contact & Content
  submitContact: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  subscribeNewsletter: (body) => request('/contact/newsletter', { method: 'POST', body: JSON.stringify(body) }),
  getGallery: (category) => request(`/contact/gallery${category ? '?category=' + category : ''}`),
  getTestimonials: () => request('/contact/testimonials'),

  // Admin
  getAdminStats: () => request('/admin/stats'),
  getAdminMembers: () => request('/admin/members'),
  createAdminMember: (body) => request('/admin/members', { method: 'POST', body: JSON.stringify(body) }),
  deleteAdminMember: (id) => request(`/admin/members/${id}`, { method: 'DELETE' })
};
