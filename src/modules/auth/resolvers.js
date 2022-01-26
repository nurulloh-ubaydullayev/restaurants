const { register, login } = require("./model");
const { signUser, verifyUser } = require("../../../lib/jwt");

module.exports = {
  Query: {
    isAdmin: async (_, {}, { token }) => {
      try {
        const { name, password } = verifyUser(token);

        const foundUser = await login(name, password);

        if (foundUser.is_admin) {
          return { status: 200, message: "Ok" };
        } else {
          return { status: 400, message: "Bad request" };
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    register: async (_, { name, password }) => {
      try {
        const user = await register(name, password);

        if (user) {
          return signUser({
            id: user.user_id,
            name: user.user_name,
            password: user.user_password,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    login: async (_, { name, password }) => {
      try {
        const user = await login(name, password);

        if (user) {
          return signUser({
            id: user.user_id,
            name: user.user_name,
            password: user.user_password,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
