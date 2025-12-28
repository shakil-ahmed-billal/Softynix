import { Router } from 'express';
import { userProductAccessController } from './user-product-access.controller';
import { userAuth } from '../../lib/auth';

/**
 * User Product Access Routes
 */

const router = Router();

// All routes require authentication
router.get('/purchases', userAuth, userProductAccessController.getMyPurchases);
router.get('/ai-subscriptions', userAuth, userProductAccessController.getMyAISubscriptions);
router.get('/software-licenses', userAuth, userProductAccessController.getMySoftwareLicenses);
router.get('/productivity-apps', userAuth, userProductAccessController.getMyProductivityApps);
router.get('/courses', userAuth, userProductAccessController.getMyCourses);
router.get('/:id', userAuth, userProductAccessController.getProductAccess);
router.put('/:id/course-progress', userAuth, userProductAccessController.updateCourseProgress);

export default router;

