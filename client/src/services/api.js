// Client API Service Layer with Graceful Fallback Data
import { 
  initialTrainers, 
  initialGallery, 
  initialBlogPosts, 
  initialClasses, 
  initialTestimonials,
  initialPrograms 
} from '../data/mockData.js';

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
    console.warn(`API [${endpoint}] unavailable, falling back to local dataset:`, err.message);
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
  getClasses: async (params = {}) => {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await request(`/classes${qs ? '?' + qs : ''}`);
      if (res && res.classes && res.classes.length > 0) return res;
      throw new Error('Fallback to local classes');
    } catch {
      let classes = initialClasses;
      if (params.day && params.day !== 'All') {
        classes = classes.filter(c => c.day.toLowerCase() === params.day.toLowerCase());
      }
      if (params.category && params.category !== 'All') {
        classes = classes.filter(c => c.category.toLowerCase() === params.category.toLowerCase());
      }
      return { success: true, count: classes.length, classes };
    }
  },
  getClassById: (id) => request(`/classes/${id}`),

  // Bookings
  bookClass: (body) => request('/bookings', { method: 'POST', body: JSON.stringify(body) }),
  getMyBookings: () => request('/bookings/my-bookings'),
  cancelBooking: (id) => request(`/bookings/${id}/cancel`, { method: 'PUT' }),
  getAllBookings: () => request('/bookings/all'),

  // Trainers
  getTrainers: async () => {
    try {
      const res = await request('/trainers');
      if (res && res.trainers && res.trainers.length > 0) return res;
      throw new Error('Fallback to local trainers');
    } catch {
      return { success: true, count: initialTrainers.length, trainers: initialTrainers };
    }
  },
  getTrainerBySlug: async (slug) => {
    try {
      const res = await request(`/trainers/${slug}`);
      if (res && res.trainer) return res;
      throw new Error('Fallback to local trainer detail');
    } catch {
      const trainer = initialTrainers.find(t => t.slug === slug || t.id === slug);
      const classes = initialClasses.filter(c => c.instructor.toLowerCase() === trainer?.name?.toLowerCase());
      return { success: true, trainer: trainer || null, classes };
    }
  },

  // Programs
  getPrograms: async (params = {}) => {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await request(`/programs${qs ? '?' + qs : ''}`);
      if (res && res.programs && res.programs.length > 0) return res;
      throw new Error('Fallback to local programs');
    } catch {
      let programs = initialPrograms;
      if (params.category && params.category !== 'All') {
        programs = programs.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
      }
      return { success: true, count: programs.length, programs };
    }
  },
  getProgramBySlug: async (slug) => {
    try {
      const res = await request(`/programs/${slug}`);
      if (res && res.program) return res;
      throw new Error('Fallback to local program');
    } catch {
      const program = initialPrograms.find(p => p.slug === slug || p.id === slug);
      let trainer = null;
      if (program && program.leadTrainer) {
        trainer = initialTrainers.find(t => t.name.toLowerCase() === program.leadTrainer.toLowerCase()) || null;
      }
      return { success: true, program: program || null, trainer };
    }
  },

  // Memberships & Payments
  getTiers: () => request('/memberships/tiers'),
  createOrder: (body) => request('/memberships/create-order', { method: 'POST', body: JSON.stringify(body) }),
  verifyPayment: (body) => request('/memberships/verify-payment', { method: 'POST', body: JSON.stringify(body) }),

  // Blog
  getBlogPosts: async (params = {}) => {
    try {
      const qs = new URLSearchParams(params).toString();
      const res = await request(`/blog${qs ? '?' + qs : ''}`);
      if (res && res.posts && res.posts.length > 0) return res;
      throw new Error('Fallback to local blog posts');
    } catch {
      let posts = initialBlogPosts;
      if (params.category && params.category !== 'All') {
        posts = posts.filter(p => p.category.toLowerCase() === params.category.toLowerCase());
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        posts = posts.filter(p => 
          p.title.toLowerCase().includes(q) || 
          p.excerpt.toLowerCase().includes(q) || 
          p.author.toLowerCase().includes(q)
        );
      }
      return { success: true, count: posts.length, posts };
    }
  },
  getBlogPostBySlug: async (slug) => {
    try {
      const res = await request(`/blog/${slug}`);
      if (res && res.post) return res;
      throw new Error('Fallback to local blog post detail');
    } catch {
      const post = initialBlogPosts.find(p => p.slug === slug || p.id === slug);
      const related = initialBlogPosts
        .filter(p => p.slug !== slug && (p.category === post?.category || !post))
        .slice(0, 3);
      return { success: true, post: post || null, related };
    }
  },

  // Contact & Content
  submitContact: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
  subscribeNewsletter: (body) => request('/contact/newsletter', { method: 'POST', body: JSON.stringify(body) }),
  getGallery: async (category) => {
    try {
      const res = await request(`/contact/gallery${category ? '?category=' + category : ''}`);
      if (res && res.gallery && res.gallery.length > 0) return res;
      throw new Error('Fallback to local gallery');
    } catch {
      let gallery = initialGallery;
      if (category && category !== 'All') {
        gallery = gallery.filter(g => g.category.toLowerCase() === category.toLowerCase());
      }
      return { success: true, count: gallery.length, gallery };
    }
  },
  getTestimonials: async () => {
    try {
      const res = await request('/contact/testimonials');
      if (res && res.testimonials && res.testimonials.length > 0) return res;
      throw new Error('Fallback to local testimonials');
    } catch {
      return { success: true, count: initialTestimonials.length, testimonials: initialTestimonials };
    }
  },

  // Admin
  getAdminStats: () => request('/admin/stats'),
  getAdminMembers: () => request('/admin/members'),
  createAdminMember: (body) => request('/admin/members', { method: 'POST', body: JSON.stringify(body) }),
  deleteAdminMember: (id) => request(`/admin/members/${id}`, { method: 'DELETE' })
};
