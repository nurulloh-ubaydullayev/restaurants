CREATE TABLE categories(
     category_id serial PRIMARY KEY,
     category_name varchar(64) NOT NULL
);

INSERT INTO categories(category_name) VALUES('Fast Food');
INSERT INTO categories(category_name) VALUES('Milliy taomlar');

CREATE TABLE users(
    user_id serial not null PRIMARY KEY,
    user_name varchar(96) not null,
    user_password varchar(24) not null,
    is_admin boolean DEFAULT false
);

INSERT INTO users(user_name, user_password, is_admin) VALUES('Nurulloh', 'admin123', true);

CREATE TABLE restaurants(
     res_id serial PRIMARY KEY,
     res_name varchar(100) not null,
     res_address text not null,
     category_id int REFERENCES categories(category_id)
);

INSERT INTO restaurants(res_name, res_address, category_id) VALUES('LOOOK', 'Beruniy', 1);

INSERT INTO restaurants(res_name, res_address, category_id) VALUES('Chorsu osh markazi', 'Chorsu bozor', 2);

CREATE TABLE products(
     product_id serial PRIMARY KEY,
     product_name varchar(60) not null,
     product_cost int not null,
     product_img text not null,
     restaurant_id int,
     FOREIGN KEY(restaurant_id) 
	  REFERENCES restaurants(res_id)
	  ON DELETE CASCADE
);

INSERT INTO products(product_name, product_cost, product_img, restaurant_id) VALUES('Osh', 10000, 'img1.jpg', 1);

CREATE TABLE orders(
     order_id serial PRIMARY KEY,
     order_city varchar(64) not null,
     order_district varchar(64) not null,
     order_address varchar(64) not null,
     order_owner varchar(100) not null,
     order_tel varchar(20) not null,
     order_status boolean DEFAULT false,
     order_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
     user_id int REFERENCES users(user_id)
);

CREATE TABLE order_product(
     op_id serial PRIMARY KEY,
     op_count int not null DEFAULT 1,
     product_id int,
     order_id int REFERENCES orders(order_id),
     FOREIGN KEY(product_id) 
	  REFERENCES products(product_id)
	  ON DELETE CASCADE
);

-- select o.op_id, o.op_count, p.product_id, p.product_name, p.product_cost, p.product_img, p.restaurant_id from order_product o inner join products p on o.product_id = p.product_id where o.order_id = 1;
