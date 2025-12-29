import { Router } from 'express';
import { userProductAccessController } from './user-product-access.controller.js';
import { userAuth } from '../../lib/auth.js';

/**
 * User Product Access Routes
 */

const router: Router = Router();

// All routes require authentication
router.get('/purchases', userAuth, userProductAccessController.getMyPurchases);
router.get('/ai-subscriptions', userAuth, userProductAccessController.getMyAISubscriptions);
router.get('/software-licenses', userAuth, userProductAccessController.getMySoftwareLicenses);
router.get('/productivity-apps', userAuth, userProductAccessController.getMyProductivityApps);
router.get('/courses', userAuth, userProductAccessController.getMyCourses);
router.get('/:id', userAuth, userProductAccessController.getProductAccess);
router.get('/:id/lesson-completions', userAuth, userProductAccessController.getLessonCompletions);
router.put('/:id/course-progress', userAuth, userProductAccessController.updateCourseProgress);
router.post('/:id/complete-lesson', userAuth, userProductAccessController.completeLesson);
router.post('/:id/view-lesson', userAuth, userProductAccessController.markLessonViewed);

export default router;

