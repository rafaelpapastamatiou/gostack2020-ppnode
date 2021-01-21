import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

const appointmentsController = new AppointmentController();

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find();
//   return res.json(appointments);
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
