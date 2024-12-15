import { Router } from 'express';
import { getHome } from '../controllers/homeController';
import { createVehicle, getVehicles, updateVehicleStatus } from '../controllers/vehicleController';

const router = Router();

router.get('/', getHome);
router.get('/vehicles', getVehicles);
router.post('/vehicles', createVehicle);
router.patch('/vehicles/:id/status', updateVehicleStatus);
export default router;
