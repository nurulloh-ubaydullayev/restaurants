const { fetch, fetchAll } = require("../../../lib/postgres");

const ORDERS = `
     SELECT
          *
     FROM
          orders
`;

const ORDER_PRODUCTS = `
     SELECT
          o.op_id,
          o.op_count,
          p.product_id,
          p.product_name,
          p.product_cost,
          p.product_img,
          p.restaurant_id
     FROM
          order_product o
     INNER JOIN
          products p
     ON
          o.product_id = p.product_id
     WHERE
          o.order_id = $1
`;

const NEW_ORDER = `
     INSERT INTO 
          orders(order_city, order_district, order_address, order_owner, order_tel, user_id)
     VALUES($1, $2, $3, $4, $5, $6)
     RETURNING *
`;

const NEW_ORDER_PRODUCTS = `
     INSERT INTO 
          order_product(op_count, product_id, order_id)
     VALUES($1, $2, $3)
`;

const UPDATE_ORDER = `
     UPDATE orders
     SET order_status = true
     WHERE order_id = $1
`;

const orders = () => fetchAll(ORDERS);
const orderProducts = orderId => fetchAll(ORDER_PRODUCTS, orderId);
const newOrder = (city, district, address, owner, tel, user) =>
  fetch(NEW_ORDER, city, district, address, owner, tel, user);

const newOrderProduct = (count, pId, oId) => fetch(NEW_ORDER_PRODUCTS, count, pId, oId);
const updateOrder = orderId => fetch(UPDATE_ORDER, orderId);

module.exports = {
  orders,
  orderProducts,
  newOrder,
  newOrderProduct,
  updateOrder,
};
