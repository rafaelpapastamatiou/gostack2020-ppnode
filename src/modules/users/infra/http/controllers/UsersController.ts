import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const { id, created_at, updated_at } = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ id, name, email, created_at, updated_at });
  }
}
