const http = require("http");
const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");
const { PORT } = require("./src/config");
const modules = require("./src/modules");
const multer = require("multer");
const cors = require("cors");
const { Pool } = require("pg");
const { verifyUser } = require("./lib/jwt");

app.use(cors());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "nur2004ub14",
  database: "restaurants",
});

let newFileName;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    newFileName = Date.now() + "--" + file.originalname;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: fileStorage });

app.post("/product", upload.single("image"), async (req, res) => {
  try {
    const { productName, productCost, restaurantId } = req.body;
    const client = await pool.connect();
    const { name, password } = verifyUser(req.headers.token);

    const { rows: foundUser } = await client.query(
      `
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
  `,
      [name, password]
    );

    if (foundUser[0].is_admin) {
      const { rows } = await client.query(
        "INSERT INTO products(product_name, product_cost, product_img, restaurant_id) VALUES($1, $2, $3, $4)",
        [productName, productCost, newFileName, restaurantId]
      );
      client.release();
      res.send("Single file upload");
    } else {
      res.status(400).send({ message: "Bad request" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/product/:imgName", (req, res) => {
  res.sendFile(__dirname + "/images/" + req.params.imgName);
});

const server = new ApolloServer({
  modules,
  context: ({ req }) => {
    return req.headers;
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);

httpServer.listen({ port: PORT }, () => {
  console.log(PORT + server.graphqlPath);
});
