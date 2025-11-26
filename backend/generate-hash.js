// Create: backend/generate-hash.js
import bcrypt from 'bcryptjs';

async function generateHash() {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 12);
  console.log('CORRECT HASH FOR "admin123":');
  console.log(hash);
}

generateHash();