import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';

import listProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;

    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(
      listProviderAppointmentsService,
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}
