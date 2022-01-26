const { fetch, fetchAll } = require("../../../lib/postgres");

const CATEGORIES = `
     SELECT
          *
     FROM
          categories
`;

const categories = () => fetchAll(CATEGORIES);

module.exports = {
  categories,
};
