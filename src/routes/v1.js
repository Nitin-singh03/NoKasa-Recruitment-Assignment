import express from 'express';
import * as v1Controller from '../controllers/v1UserController.js';
import { validateBody } from '../middlewares/validate.js';
import { v1UserSchema } from '../validators/v1UserSchema.js';

const router = express.Router();

router.post('/users', validateBody(v1UserSchema), v1Controller.createUser);
router.get('/users/:id', v1Controller.getUser);
router.get('/users', v1Controller.listUsers);
router.delete('/users/:id', v1Controller.deleteUser);

export default router;
