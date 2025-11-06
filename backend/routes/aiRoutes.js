import express from 'express'
import { generateOutline, generateChapterContent } from '../controller/aiController.js'
import verifyJWT from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(verifyJWT);

router.route("/generate-outline").post(generateOutline);
router.route("/generate-chapter-content").post(generateChapterContent);



export default router;