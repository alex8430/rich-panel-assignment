import express from 'express';

import blogRoutes from './BlogRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/posts', blogRoutes);
router.use('/', authRoutes);

export default router;
