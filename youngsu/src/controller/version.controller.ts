import express from 'express';
import indexRouter from './index.controller';

const router = express.Router();

router.use('/index',indexRouter);

export default router;