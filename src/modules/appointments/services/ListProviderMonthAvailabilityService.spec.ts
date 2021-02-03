import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

// repositories
let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

// services
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list provider`s month availability', async () => {
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

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 0, 1, 8).getTime();
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 13, 0, 0),
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

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 5, 10, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: provider.id,
      month: 1,
      year: 2021,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 4, available: false },
        { day: 5, available: true },
      ]),
    );
  });
});
