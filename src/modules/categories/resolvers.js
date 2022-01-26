const { categories } = require("./model");

module.exports = {
  Query: {
    categories: async () => {
      return await categories();
    },
  },

  Categories: {
    id: global => global.category_id,
    name: global => global.category_name,
  },
};
