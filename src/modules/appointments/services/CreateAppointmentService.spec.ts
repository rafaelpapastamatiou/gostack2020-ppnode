import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: 'provider-123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id');
    expect(appointment).toHaveProperty('date');

    expect(appointment.provider_id).toBe('provider-123456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: 'provider-123456',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: 'provider-234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});