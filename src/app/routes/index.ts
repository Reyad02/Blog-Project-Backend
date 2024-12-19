import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { BlogRouter } from '../modules/blog/blog.route';

const router = Router();
const moduleRoutes = [
  { path: '/auth', route: AuthRouter },
  { path: '/blogs', route: BlogRouter },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
