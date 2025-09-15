import bcrypt from 'bcrypt';
import logger from '../utils/logger.js';
import { normalizeId as normalizeEmail } from '../models/emailUserModel.js';
import { normalizeId as normalizePhone } from '../models/phoneUserModel.js';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || '10', 10);

// In-memory stores: map key -> stored object { id, passwordHash }
const emailStore = new Map();
const phoneStore = new Map();

/**
 * Create email user
 * returns public object { id }
 * throws Error with statusCode when duplicate/invalid
 */
export async function createUserEmail(rawEmail, plainPassword) {
  const id = normalizeEmail(rawEmail);
  if (!id) {
    const err = new Error('Invalid email');
    err.statusCode = 400;
    throw err;
  }
  if (emailStore.has(id)) {
    const err = new Error('User with this email already exists');
    err.statusCode = 409;
    throw err;
  }
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  emailStore.set(id, { id, passwordHash: hash });
  logger.info(`Email user created: ${id}`);
  return { id };
}

/**
 * Create phone user
 * returns public object { id }
 */
export async function createUserPhone(rawPhone, plainPassword) {
  const id = normalizePhone(rawPhone);
  if (!id) {
    const err = new Error('Invalid phone');
    err.statusCode = 400;
    throw err;
  }
  if (phoneStore.has(id)) {
    const err = new Error('User with this phone already exists');
    err.statusCode = 409;
    throw err;
  }
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  phoneStore.set(id, { id, passwordHash: hash });
  logger.info(`Phone user created: ${id}`);
  return { id };
}

//  Get user by email - returns public view or null
export function getUserByEmail(rawEmail) {
  const id = normalizeEmail(rawEmail);
  const stored = emailStore.get(id);
  if (!stored) return null;
  return { id: stored.id };
}

// Get user by phone - returns public view or null
export function getUserByPhone(rawPhone) {
  const id = normalizePhone(rawPhone);
  const stored = phoneStore.get(id);
  if (!stored) return null;
  return { id: stored.id };
}

// List email users (public)
export function listEmails() {
  return Array.from(emailStore.values()).map(u => ({ id: u.id }));
}

// List phone users (public)
export function listPhones() {
  return Array.from(phoneStore.values()).map(u => ({ id: u.id }));
}

// List phone users (public)
export function deleteEmail(rawEmail) {
  const id = normalizeEmail(rawEmail);
  return emailStore.delete(id);
}

// Delete phone user - returns true/false
export function deletePhone(rawPhone) {
  const id = normalizePhone(rawPhone);
  return phoneStore.delete(id);
}
