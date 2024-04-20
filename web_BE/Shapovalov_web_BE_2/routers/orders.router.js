import { Router } from 'express';
import { authorizationMiddleware } from '../middlewares.js';
import { ORDERS, ADDRESSES } from '../db.js';

export const OrdersRouter = Router();



const convertToDate = (date) => {

  /***
   * ^ -- початок рядка
   * \d -- перевірка на цифру
   * {N} -- N - разів повторень
   */
  // if (/^\d\d-(01|02|03|....|10|11|12)-\d{4}$/.test(query.createdAt)) { }
  if (!/^\d\d-\d\d-\d{4}$/.test(date)) {
    // return res.status(400).send({ message: `parameter createdAt has wrong format` });
    throw new Error(`parameter createdAt has wrong format`);
  }

  // const res = query.createdAt.split('-');
  // const month = res[1];
  const [day, month, year] = date.split('-');

  const mothsInt = parseInt(month);
  if (mothsInt < 1 || mothsInt > 12) {
    // return res.status(400).send({ message: `parameter createdAt has wrong month value` });

    throw new Error(`parameter createdAt has wrong month value`);
  }

  const result = new Date();
  result.setHours(2);
  result.setMinutes(0);
  result.setMilliseconds(0);
  result.setSeconds(0);

  result.setMonth(mothsInt - 1);
  result.setDate(day);
  result.setFullYear(year);

  return result;
};

const convertToDateMiddleware = (fieldName) => (req, res, next) => {
  const valueString = req.query[fieldName];

  if (!valueString) {
    return next();
  }
  try {
    const value = convertToDate(valueString);
    req.query[fieldName] = value;
    return next();
  } catch (err) {
    return res.status(400)
      .send({ message: err.toString() });
  }
};

function harvesineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = Math.ceil((R * c) / 1000); // in kilometres

  return d;
};

OrdersRouter.post('/orders', authorizationMiddleware, (req, res) => {
  const { body, user } = req;

  let setAddresses = new Array();

  for (let i = 0; i < ADDRESSES.data.length; i++) {
    let temp = ADDRESSES.data[i].name;
    setAddresses.push(temp);
  };

  if (!setAddresses.includes(body.from)) {
    return res.status(400).send({ message: `${body.from} is not present` });
  };

  if (!setAddresses.includes(body.to)) {
    return res.status(400).send({ message: `${body.to} is not present` });
  };

  let locFrom = 0;
  let locTo = 0;

  for (let i = 0; i < ADDRESSES.data.length; i++) {
    if (ADDRESSES.data[i].name == body.from) {
      locFrom = ADDRESSES.data[i].location
    }
    if (ADDRESSES.data[i].name == body.to) {
      locTo = ADDRESSES.data[i].location
    }
  };

  const distance = harvesineDistance(locFrom.latitude, locFrom.longitude, locTo.latitude, locFrom.longitude);

  let price = 0;

  switch (body.type) {
    case "standard":
      price = distance * 2.5;
      break;
    case "lite":
      price = distance * 1.5;
      break;
    case "universal":
      price = distance * 3;
      break;
    default:
      return res.status(400).send({ message: 'Order type is not valid' })
  };

  const createdAt = new Date();
  createdAt.setHours(2);
  createdAt.setMinutes(0);
  createdAt.setMilliseconds(0);
  createdAt.setSeconds(0);

  const order = {
    ...body,
    price,
    login: user.login,
    createdAt,
    status: "Active",
    id: crypto.randomUUID()
  };

  ORDERS.push(order);

  return res.status(200).send({ message: 'Order was created', order, distance, setAddresses });
});

/**
* GET /orders?createdAt=05-05-2024
* GET /orders?createdAt= g mhdfbg kjdfbgkjd
*/
OrdersRouter.get('/orders', authorizationMiddleware,
  convertToDateMiddleware('createdAt'),
  convertToDateMiddleware('createdFrom'),
  convertToDateMiddleware('createdTo'),
  (req, res) => {
    const { user, query } = req;

    if (user.role === "Admin") {
      const allOrders = ORDERS.data;
      return res.status(200).send(allOrders);
    }

    if (user.role === "Driver") {
      const activeOrders = ORDERS.filter(el => el.status == "Active");
      return res.status(200).send(activeOrders);
    }

    if (query.createdAt && query.createdFrom && query.createdTo) {
      return res.status(400).send({ message: "Too many parameter in query string" });
    }

    console.log(`query`, JSON.stringify(query));

    let orders = ORDERS.filter(el => el.login === user.login);

    if (query.createdAt) {

      try {
        orders = ORDERS.filter(el => {
          const value = new Date(el.createdAt);
          return value.getTime() === query.createdAt.getTime();
        });
      } catch (err) {
        return res.status(400)
          .send({ message: err.toString() });
      }
    }

    if (query.createdFrom) {
      try {
        orders = ORDERS.filter(el => {
          const value = new Date(el.createdAt);
          return value.getTime() >= query.createdFrom.getTime();
        });
      } catch (err) {
        return res.status(400)
          .send({ message: err.toString() });
      }
    }

    if (query.createdTo) {
      try {
        orders = ORDERS.filter(el => {
          const value = new Date(el.createdAt);
          return value.getTime() <= query.createdTo.getTime();
        });
      } catch (err) {
        return res.status(400)
          .send({ message: err.toString() });
      }
    }

    return res.status(200).send(orders);
  });



/**
 * PATCH /orders/fhsdjkhfkdsj
 * PATCH /orders/fhsdjkhfkdsj12
 * PATCH /orders/fhsdjkhfkdsj123
 * PATCH /orders/fhsdjkhfkd123sj
 */

OrdersRouter.patch('/orders/:orderId', (req, res) => {

  const { params } = req;

  let order = ORDERS.find(el => el.id === params.orderId);

  if (!order) {
    return res.status(400).send({ message: `Order with id ${params.orderId} was not found` });
  }

  const { body } = req;

  ORDERS.update((el) => el.id === params.orderId, { status: body.status });

  order = ORDERS.find(el => el.id === params.orderId);
  return res.status(200).send(order);
});