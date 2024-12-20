import { Router } from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { BlogRouter } from '../modules/blog/blog.route';
import { AdminRouter } from '../modules/admin/admin.route';

const router = Router();
const moduleRoutes = [
  { path: '/auth', route: AuthRouter },
  { path: '/blogs', route: BlogRouter },
  { path: '/admin', route: AdminRouter },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
