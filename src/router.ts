import { Router } from 'express';
import { body } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import { handleInputError } from './modules/middleware';

const router = Router();

/**
 * Product
 */

router.get('/product', getProducts);
router.post(
  '/product/',
  body('name').isString(),
  handleInputError,
  createProduct
);

router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputError,
  updateProduct
);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */

router.get('/update', () => {});
router.post(
  '/update/',
  body('title').exists().isString(),
  body('body').exists().isString(),
  handleInputError,
  (req, res) => {}
);
router.get('/update/:id', () => {});
router.put(
  '/update/:id',
  body('title').optional().isString(),
  body('body').optional().isString(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  handleInputError,
  () => {}
);
router.delete('/update/:id', () => {});

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

export default router;
