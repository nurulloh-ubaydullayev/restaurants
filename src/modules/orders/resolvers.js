const {
  orders,
  orderProducts,
  newOrder,
  newOrderProduct,
  updateOrder,
} = require("./model");
const { verifyUser } = require("../../../lib/jwt");
const { login } = require("../auth/model");

module.exports = {
  Query: {
    orders: async (_, __, { token }) => {
      try {
        const { name, password } = verifyUser(token);

        const foundUser = await login(name, password);

        if (foundUser.is_admin) {
          return await orders();
        }
      } catch (e) {
        console.log(e);
      }
    },
    orderProducts: async (_, { orderId }, { token }) => {
      try {
        const { name, password } = verifyUser(token);

        const foundUser = await login(name, password);

        if (foundUser.is_admin) {
          return await orderProducts(orderId);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  Mutation: {
    newOrder: async (
      _,
      { city, district, address, owner, tel, productsList },
      { token }
    ) => {
      const { name, password } = verifyUser(token);

      const foundUser = await login(name, password);

      if (foundUser) {
        const order = await newOrder(
          city,
          district,
          address,
          owner,
          tel,
          foundUser.user_id
        );

        let list = JSON.parse(productsList);

        for (let i of list) {
          await newOrderProduct(i.count, i.id, order.order_id);
        }
        return "Created";
      }
    },
    updateOrder: async (_, { orderId }, { token }) => {
      try {
        const { name, password } = verifyUser(token);

        const foundUser = await login(name, password);

        if (foundUser.is_admin) {
          await updateOrder(orderId);
          return "Updated";
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  Orders: {
    id: global => global.order_id,
    city: global => global.order_city,
    district: global => global.order_district,
    address: global => global.order_address,
    owner: global => global.order_owner,
    tel: global => global.order_tel,
    status: global => global.order_status,
    time: global => global.order_time,
    user: global => global.user_id,
  },
  orderProduct: {
    id: global => global.op_id,
    count: global => global.op_count,
    productId: global => global.product_id,
    name: global => global.product_name,
    cost: global => global.product_cost,
    image: global => global.product_img,
    restaurantId: global => global.restaurant_id,
  },
};
