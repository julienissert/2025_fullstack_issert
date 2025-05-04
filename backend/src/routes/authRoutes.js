import { Router } from 'express';
import { register, login, isAuth} from '../controllers/authController.js';

const router = Router();

router.get('/is-auth', isAuth);
router.post('/register', register);
router.post('/login', login);

export default router;