import { Router } from 'express';
import { courseController } from './course.controller';
import { adminAuth } from '../../lib/auth';
/**
 * Course Routes
 * All routes require admin authentication
 */
const router = Router();
// All routes require admin authentication
router.get('/', adminAuth, courseController.getAllCourses);
router.get('/:id', adminAuth, courseController.getCourseById);
router.get('/product/:productId', adminAuth, courseController.getCourseByProductId);
router.post('/', adminAuth, courseController.createCourse);
router.put('/:id', adminAuth, courseController.updateCourse);
router.delete('/:id', adminAuth, courseController.deleteCourse);
export default router;
//# sourceMappingURL=course.routes.js.map