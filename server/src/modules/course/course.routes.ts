import { Router } from 'express';
import { courseController } from './course.controller.js';
import { adminAuth } from '../../lib/auth.js';
import { uploadSingle } from '../../lib/multer.js';

/**
 * Course Routes
 * All routes require admin authentication
 */

const router: Router = Router();

// All routes require admin authentication
router.get('/', adminAuth, courseController.getAllCourses);
router.get('/:id', adminAuth, courseController.getCourseById);
router.get('/product/:productId', adminAuth, courseController.getCourseByProductId);
router.post('/', adminAuth, uploadSingle('thumbnail'), courseController.createCourse);
router.put('/:id', adminAuth, uploadSingle('thumbnail'), courseController.updateCourse);
router.delete('/:id', adminAuth, courseController.deleteCourse);

export default router;

