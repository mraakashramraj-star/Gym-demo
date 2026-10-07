import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSeedData } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storePath = path.join(__dirname, '../data/store.json');

const data = getSeedData();
fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`RESEED_COMPLETE: trainers=${data.trainers.length}, gallery=${data.gallery.length}, blogPosts=${data.blogPosts.length}`);
