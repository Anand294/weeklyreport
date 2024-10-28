import { Router } from "express";
import * as functionController from './controller.js';

const router = Router();

router.get('/report/all', functionController.getAllFunctionReportData);
router.get('/', functionController.getAllFunctions);
router.get('/report/:id', functionController.getDataByFunctionId);
router.post('/report/:id', functionController.addUpdateFunctionReport);

export default router;
