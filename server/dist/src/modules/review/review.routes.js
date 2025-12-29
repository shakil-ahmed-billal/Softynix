import { Router } from 'express';
import { reviewController } from './review.controller.js';
import { userAuth, adminAuth, optionalUserAuth } from '../../lib/auth.js';
/**
 * Review Routes
 */
const router = Router();
// Public routes
router.get('/approved', reviewController.getApprovedReviews);
router.get('/product/:productId', optionalUserAuth, reviewController.getReviewsByProductId);
// User routes (authenticated)
router.get('/my-reviews', userAuth, reviewController.getMyReviews);
router.post('/', userAuth, reviewController.createReview);
router.put('/:id', userAuth, reviewController.updateReview);
router.delete('/:id', userAuth, reviewController.deleteReview);
// Admin routes
router.get('/', adminAuth, reviewController.getAllReviews);
router.get('/user/:userId', adminAuth, reviewController.getReviewsByUserId);
router.get('/:id', adminAuth, reviewController.getReviewById);
router.put('/:id/status', adminAuth, reviewController.updateReviewStatus);
export default router;
//# sourceMappingURL=review.routes.js.map