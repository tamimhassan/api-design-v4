import { Router } from 'express';
import { body } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  // DeleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';
import { handleInputError } from './modules/middleware';

const router = Router();

/**
 * Product
 */

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.delete('/product/:id', deleteProduct);
router.post(
  '/product/',
  body('name').isString(),
  handleInputError,
  createProduct
);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputError,
  updateProduct
);

/**
 * Update
 */

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
// router.delete('/update/:id', DeleteUpdate);
router.post(
  '/update/',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputError,
  createUpdate
);
router.put(
  '/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('productId').exists().isString(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  handleInputError,
  updateUpdate
);

/**
 * Update Point
 */

router.get('/updatepoint', () => {});
router.post(
  '/updatepoint/',
  body('name').exists().isString(),
  body('description').exists().isString(),
  body('updateId').exists().isString(),
  handleInputError,
  () => {}
);
router.get('/updatepoint/:id', () => {});
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputError,
  () => {}
);
router.delete('/updatepoint/:id', () => {});

router.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: 'Opps thats on us.' });
  }
});

export default router;
