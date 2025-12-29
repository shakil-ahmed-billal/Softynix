import { Router } from 'express';
import { productCredentialsController } from './product-credentials.controller';
import { adminAuth } from '../../lib/auth';

/**
 * Product Credentials Routes
 * All routes require admin authentication
 */

const router: Router = Router();

// All routes require admin authentication
router.get('/', adminAuth, productCredentialsController.getAllProductCredentials);
router.get('/product/:productId', adminAuth, productCredentialsController.getCredentialsByProductId);
router.get('/:id', adminAuth, productCredentialsController.getCredentialsById);
router.post('/', adminAuth, productCredentialsController.upsertProductCredentials);
router.delete('/:id', adminAuth, productCredentialsController.deleteProductCredentials);
router.post('/:id/apply', adminAuth, productCredentialsController.applyCredentialsToUsers);

export default router;

