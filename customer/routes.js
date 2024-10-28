import { Router } from 'express';
import * as custController from './controller.js'; // Ensure the correct path and .js is included

const router = Router();

router.get('/report/all', custController.getAllCustomerReportData);
router.get('/', custController.getAllCustomer);
router.get('/report/:id', custController.getDataByCustomerId);
router.post('/report/:id', custController.addUpdateCustomerReport);

export default router;
