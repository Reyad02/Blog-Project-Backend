import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middleware/auth';

const router = express.Router();
router.post(
  '/',
  auth(),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);

export const BlogRouter = router;
