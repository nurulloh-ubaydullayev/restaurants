const { fetch } = require("../../../lib/postgres");

const REGISTER = `
    INSERT INTO
        users(user_name, user_password)
    VALUES($1, $2)
    RETURNING user_id, user_name, user_password
`;

const LOGIN = `
    SELECT 
        user_id,
        user_name,
        user_password,
        is_admin
    FROM
        users
    WHERE
        user_name = $1
    AND
        user_password = $2
`;

const register = (name, password) => fetch(REGISTER, name, password);
const login = (name, password) => fetch(LOGIN, name, password);

module.exports = {
  register,
  login,
};
