import { Router } from 'express';
import { createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { getProjectStats } from '../controllers/statsController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.get('/stats', getProjectStats);
router.post('/projects',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ]),
  createProject
);
router.put('/projects/:id',
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 5 }
  ]),
  updateProject
);
router.delete('/projects/:id', deleteProject);

export default router;