import express from 'express';
import auth from '../../middleware/auth';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.delete('/blogs/:id', auth(), AdminControllers.deleteBlog);

export const AdminRouter = router;
