import { USERS } from '../db.js';
import { Router } from 'express';

export const UsersRouter = Router();

UsersRouter.post('/users', (req, res) => {
  const { body } = req;

  console.log(`body`, JSON.stringify(body));

  const isUserExist = USERS.some(el => el.login === body.login);
  if (isUserExist) {
    return res.status(400).send({ message: `user with login ${body.login} already exists` });
  }

  body.role = "Customer";

  USERS.push(body);

  res.status(200).send({ message: 'User was created' });
});

UsersRouter.post('/admin', (req, res) => {
  const { body, headers } = req;

  console.log(`body`, JSON.stringify(body));

  if (!body.login || !body.password) {
    return res.status(400).send({ message: 'Required fields not present' });
  }

  if (Object.keys(body).length != 2) {
    return res.status(400).send({ message: 'Incorrect body parameters' })
  } // для того щоб не можна було смітити базу даних непотрібними полями

  if (headers.authorization !== 'quake3arena') {
    return res.status(400).send({ message: 'Invalid admin password' });
  }

  const isUserExist = USERS.some(el => el.login === body.login);
  if (isUserExist) {
    return res.status(400).send({ message: `user with login ${body.login} already exists` });
  }

  body.role = 'Admin';

  USERS.push(body);

  res.status(200).send({ message: 'Admin user was created' });

});

UsersRouter.get('/users', (req, res) => {
  const users = USERS.map(user => {
    const { password, ...other } = user;
    return other;
  });
  return res
    .status(200)
    .send(users);
});

UsersRouter.post('/login', (req, res) => {
  const { body } = req;

  const user = USERS
    .find(el => el.login === body.login && el.password === body.password);

  if (!user) {
    return res.status(400).send({ message: 'User was not found' });
  }

  const token = crypto.randomUUID();

  user.token = token;
  USERS.save(user.login, { token });

  return res.status(200).send({
    token,
    message: 'User was login'
  });
});

UsersRouter.post('/drivers', (req, res) => {
  const { body } = req;

  console.log(`body`, JSON.stringify(body));

  if (!body.login || !body.password) {
    return res.status(400).send({ message: 'Required fields not present' });
  }

  if (Object.keys(body).length != 2) {
    return res.status(400).send({ message: 'Incorrect body parameters' })
  } // для того щоб не можна було смітити базу даних непотрібними полями

  const isUserExist = USERS.some(el => el.login === body.login);
  if (isUserExist) {
    return res.status(400).send({ message: `user with login ${body.login} already exists` });
  }

  body.role = 'Driver';

  USERS.push(body);

  res.status(200).send({ message: 'Driver user was created' });

});