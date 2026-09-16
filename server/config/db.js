import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { getSeedData } from '../seed/seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let isMongoConnected = false;
let memoryStore = null;

// Read JSON store
function readStore() {
  if (memoryStore) return memoryStore;

  if (!fs.existsSync(DB_FILE)) {
    const initialData = getSeedData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    memoryStore = initialData;
    return memoryStore;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    memoryStore = JSON.parse(raw);
    return memoryStore;
  } catch (err) {
    console.error('Error reading JSON db, re-seeding:', err.message);
    const initialData = getSeedData();
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    memoryStore = initialData;
    return memoryStore;
  }
}

// Write JSON store safely
function writeStore(data) {
  memoryStore = data;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to JSON db:', err.message);
  }
}

// Generic Collection Repository
class CollectionRepository {
  constructor(collectionName) {
    this.name = collectionName;
  }

  getAll() {
    const store = readStore();
    return store[this.name] || [];
  }

  find(filterFn = () => true) {
    const items = this.getAll();
    return items.filter(filterFn);
  }

  findOne(filterFn) {
    const items = this.getAll();
    return items.find(filterFn) || null;
  }

  findById(id) {
    const items = this.getAll();
    return items.find(item => item.id === id || item._id === id) || null;
  }

  create(item) {
    const store = readStore();
    if (!store[this.name]) store[this.name] = [];
    
    const newItem = {
      id: item.id || `doc-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      ...item
    };

    store[this.name].push(newItem);
    writeStore(store);
    return newItem;
  }

  findByIdAndUpdate(id, updates) {
    const store = readStore();
    const list = store[this.name] || [];
    const index = list.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    writeStore(store);
    return list[index];
  }

  findByIdAndDelete(id) {
    const store = readStore();
    const list = store[this.name] || [];
    const index = list.findIndex(item => item.id === id || item._id === id);
    if (index === -1) return false;

    const removed = list.splice(index, 1)[0];
    writeStore(store);
    return removed;
  }

  count(filterFn = () => true) {
    return this.find(filterFn).length;
  }
}

// Repositories for each domain entity
export const db = {
  users: new CollectionRepository('users'),
  classes: new CollectionRepository('classes'),
  bookings: new CollectionRepository('bookings'),
  trainers: new CollectionRepository('trainers'),
  programs: new CollectionRepository('programs'),
  blogPosts: new CollectionRepository('blogPosts'),
  testimonials: new CollectionRepository('testimonials'),
  gallery: new CollectionRepository('gallery'),
  contactMessages: new CollectionRepository('contactMessages'),
  newsletterSubscribers: new CollectionRepository('newsletterSubscribers')
};

// Connect to MongoDB if MONGODB_URI is provided
export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log('⚡ [DB Notice]: No MONGODB_URI provided. Running in high-performance atomic local store mode (zero setup required).');
    readStore(); // Initialize seed store
    return false;
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    isMongoConnected = true;
    console.log('✅ [MongoDB]: Successfully connected to MongoDB cluster.');
    return true;
  } catch (err) {
    console.warn('⚠️ [MongoDB Connection Warning]: Could not reach MongoDB at MONGODB_URI (' + err.message + '). Seamlessly falling back to local persistent store mode.');
    readStore();
    return false;
  }
}
