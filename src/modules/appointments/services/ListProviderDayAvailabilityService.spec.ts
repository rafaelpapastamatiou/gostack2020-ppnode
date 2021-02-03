import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderDayAvailability from './ListProviderDayAvailabilityService';

// repositories
let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

// services
let listProviderDayAvailability: ListProviderDayAvailability;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list provider`s day availability', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'loggeduser@example.com',
      password: '123456',
    });

    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 0, 4, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: provider.id,
      month: 1,
      day: 4,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
        { hour: 17, available: true },
      ]),
    );
  });
});
