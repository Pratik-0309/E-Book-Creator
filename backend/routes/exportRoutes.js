import express from 'express'
import { exportAsDocument } from '../controller/exportController.js'
import verifyJWT from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(verifyJWT);

router.route("/:id/docx").get(exportAsDocument)

export default router;