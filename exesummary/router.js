import { Router } from 'express';
import  getExeMail  from './controller.js';

const router = Router();

router.post('/', getExeMail);

export default router;
