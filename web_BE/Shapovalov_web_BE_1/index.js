import express from 'express';
import bodyParser from 'body-parser';
import { USERS, ORDERS } from './db.js';
import { authorizationMiddleware } from './middlewares.js';

const app = express();

app.use(bodyParser.json());

/**
 * POST -- create resource
 * req -> input data
 * res -> output data
 */
app.post('/users', (req, res) => {
  const { body } = req;

  console.log(`body`, JSON.stringify(body));

  const isUserExist = USERS.some(el => el.login === body.login);
  if (isUserExist) {
    return res.status(400).send({ message: `user with login ${body.login} already exists` });
  }

  USERS.push(body);

  res.status(200).send({ message: 'User was created' });
});

app.get('/users', (req, res) => {
  const users = USERS.map(user => {
    const { password, ...other } = user;
    return other;
  });
  return res
    .status(200)
    .send(users);
});

app.post('/login', (req, res) => {
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

app.post('/orders', authorizationMiddleware, (req, res) => {
  const { body, user } = req;

  var price = Math.floor(Math.random() * (100 - 20 + 1) + 20);

  const order = {
    price: price.toString(),
    ...body,
    login: user.login
  };

  ORDERS.push(order);

  return res.status(200).send({ message: 'Order was created', order });
});

app.get('/orders', authorizationMiddleware, (req, res) => {
  const { user } = req;

  const orders = ORDERS.filter(el => el.login === user.login);

  return res.status(200).send(orders);
});

app.get('/orders/from', authorizationMiddleware, (req, res) => {
  const { user } = req;

  const orders = ORDERS.filter(el => el.login === user.login);

  // orders = orders.reverse();

  let lastOrders = [];

  for (var i = 0, len = orders.length; i < len; i++) {
    if (!lastOrders.includes(orders[len - 1 - i].from)) {
      lastOrders.push(orders[len - 1 - i].from);
    };
    if (lastOrders.length > 4) {
      break
    };
  };
  return res.status(200).send(lastOrders);
});

app.get('/orders/to', authorizationMiddleware, (req, res) => {
  const { user } = req;

  const orders = ORDERS.filter(el => el.login === user.login);

  let lastOrders = [];

  for (var i = 0, len = orders.length; i < len; i++) {
    if (!lastOrders.includes(orders[len - 1 - i].to)) {
      lastOrders.push(orders[len - 1 - i].to); // len - i для того щоб починати з кінця array без того
      // щоб перевертати його, що може бути дорогою операцією при великих об'ємах даних
    };
    if (lastOrders.length > 4) {
      break
    };
  };
  return res.status(200).send(lastOrders);
});

app.get('/orders/highest', authorizationMiddleware, (req, res) => {
  const { user } = req;

  const orders = ORDERS.filter(el => el.login === user.login && el.price);

  if (orders.length === 0) {
    return res.status(400).send({ message: "User does not have orders yet" })
  };

  var max = 0;
  var highest = null;
  for (var i = 0, len = orders.length; i < len; i++) {
    if (orders[i].price > max) {
      max = orders[i].price;
      highest = orders[i]
    }
  };

  return res.status(200).send(highest);
});

app.get('/orders/lowest', authorizationMiddleware, (req, res) => {
  const { user } = req;

  const orders = ORDERS.filter(el => el.login === user.login && el.price);

  if (orders.length === 0) {
    return res.status(400).send({ message: "User does not have orders yet" })
  };

  var min = null;
  var lowest = null;
  for (var i = 0, len = orders.length; i < len; i++) {
    if (min === null || orders[i].price < min) {
      min = orders[i].price;
      lowest = orders[i]
    }
  };

  return res.status(200).send(lowest);
});

app.listen(8080, () => console.log('Server was started'));