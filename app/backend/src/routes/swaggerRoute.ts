import { Router } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

const router = Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
