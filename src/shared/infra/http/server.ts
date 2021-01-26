import 'reflect-metadata';

import cors from 'cors';

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import routes from '@shared/infra/http/routes';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';

import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.log(err);

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error.' });
});

app.listen(3333, () => console.log('Server started on port 3333'));
