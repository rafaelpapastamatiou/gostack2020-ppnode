import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

// repositories
let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

// services
let listProviderAppointmentsService: ListProviderAppointmentsService;

// providers
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list provider appointments on specific date', async () => {
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
      return new Date(2021, 0, 1, 8).getTime();
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 8, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 10, 0, 0),
    });

    const appointment3 = await fakeAppointmentsRepository.create({
      user_id: loggedUser.id,
      provider_id: provider.id,
      date: new Date(2021, 0, 4, 12, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: provider.id,
      year: 2021,
      month: 1,
      day: 4,
    });

    expect(appointments).toEqual([appointment1, appointment2, appointment3]);
  });
});
