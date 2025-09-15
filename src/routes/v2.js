import express from 'express';
import * as v2Controller from '../controllers/v2UserController.js';
import { validateBody } from '../middlewares/validate.js';
import { v2UserSchema } from '../validators/v2UserSchema.js';

const router = express.Router();

router.post('/users', validateBody(v2UserSchema), v2Controller.createUser);
router.get('/users/:id', v2Controller.getUser);
router.get('/users', v2Controller.listUsers);
router.delete('/users/:id', v2Controller.deleteUser);

export default router;
