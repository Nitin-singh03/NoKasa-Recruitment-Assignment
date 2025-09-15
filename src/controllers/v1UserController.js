import * as userService from '../services/userService.js';

//POST /v1/users
export async function createUser(req, res, next) {
  try {
    const { id, password } = req.body;
    const created = await userService.createUserEmail(id, password);
    return res.status(201).json({ success: true, message: 'User created', data: created });
  } catch (err) {
    return next(err);
  }
}

//GET /v1/users/:id
export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = userService.getUserByEmail(id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, message: 'User found', data: user });
  } catch (err) {
    return next(err);
  }
}

// GET /v1/users
export async function listUsers(req, res, next) {
  try {
    const list = userService.listEmails();
    return res.json({ success: true, message: 'Users list', data: { users: list } });
  } catch (err) {
    return next(err);
  }
}

// DELETE /v1/users/:id
export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = userService.deleteEmail(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    return next(err);
  }
}
