import { Router } from "express";
import * as miscController from './controller.js';

const router = Router();

router.get('/report/all', miscController.getAllMiscReportData);
router.get('/', miscController.getAllMisc);
router.get('/report/:id', miscController.getDataByMiscId);
router.post('/report/:id', miscController.addUpdateMiscReport);

export default router;
