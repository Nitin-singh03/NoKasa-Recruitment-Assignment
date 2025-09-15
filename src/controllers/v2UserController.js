import * as userService from '../services/userService.js';

export async function createUser(req, res, next) {
  try {
    const { id, password } = req.body;
    const created = await userService.createUserPhone(id, password);
    return res.status(201).json({ success: true, message: 'User created', data: created });
  } catch (err) {
    return next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = userService.getUserByPhone(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, message: 'User found', data: user });
  } catch (err) {
    return next(err);
  }
}

export async function listUsers(req, res, next) {
  try {
    const list = userService.listPhones();
    return res.json({ success: true, message: 'Users list', data: { users: list } });
  } catch (err) {
    return next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = userService.deletePhone(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    return next(err);
  }
}
