import express, { application } from 'express';
import {index,indexPage} from '../service/index.service';

const router = express.Router();

router.get('/',indexPage);
router.post('/',index);

export default router;