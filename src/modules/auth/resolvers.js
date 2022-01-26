const { register, login } = require("./model");
const { signUser, verifyUser } = require("../../../lib/jwt");

module.exports = {
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
