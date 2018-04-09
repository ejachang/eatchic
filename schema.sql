-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL,
  username VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  bio VARCHAR NULL,
  photo VARCHAR NULL,
  role INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'posts'
--
-- ---

DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id SERIAL,
  content TEXT NULL,
  image VARCHAR NULL,
  likesDish INTEGER NULL,
  userID INTEGER NULL,
  dishId INTEGER NULL,
  recipe VARCHAR NULL,
  restaurantId INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'comments'
--
-- ---

DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id SERIAL,
  content TEXT NULL,
  postId INTEGER NOT NULL,
  userId INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'dishes'
--
-- ---

DROP TABLE IF EXISTS dishes;

CREATE TABLE dishes (
  id SERIAL,
  name INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'restaurants'
--
-- ---

DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id SERIAL,
  name VARCHAR NOT NULL,
  description TEXT NULL,
  category VARCHAR NULL,
  location VARCHAR NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'menus'
--
-- ---

DROP TABLE IF EXISTS menus;

CREATE TABLE menus (
  id SERIAL,
  dishId INTEGER NULL,
  restaurantId INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'tags'
--
-- ---

DROP TABLE IF EXISTS tags;

CREATE TABLE tags (
  id SERIAL,
  name VARCHAR NOT NULL,
  postId INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'notifications'
--
-- ---

DROP TABLE IF EXISTS notifications;

CREATE TABLE notifications (
  id SERIAL,
  Text TEXT NULL,
  postId INTEGER NOT NULL,
  seen BOOLEAN NOT NULL,
  userId INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'followers'
--
-- ---

DROP TABLE IF EXISTS followers;

CREATE TABLE followers (
  id SERIAL,
  followerId INTEGER NULL,
  followeeId INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'likes'
--
-- ---

DROP TABLE IF EXISTS likes;

CREATE TABLE likes (
  id SERIAL,
  postId INTEGER NULL,
  userId INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE posts ADD FOREIGN KEY (userID) REFERENCES users (id);
ALTER TABLE posts ADD FOREIGN KEY (dishId) REFERENCES dishes (id);
ALTER TABLE posts ADD FOREIGN KEY (restaurantId) REFERENCES restaurants (id);
ALTER TABLE comments ADD FOREIGN KEY (postId) REFERENCES posts (id);
ALTER TABLE comments ADD FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE menus ADD FOREIGN KEY (dishId) REFERENCES dishes (id);
ALTER TABLE menus ADD FOREIGN KEY (restaurantId) REFERENCES restaurants (id);
ALTER TABLE tags ADD FOREIGN KEY (postId) REFERENCES posts (id);
ALTER TABLE notifications ADD FOREIGN KEY (postId) REFERENCES posts (id);
ALTER TABLE notifications ADD FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE followers ADD FOREIGN KEY (followerId) REFERENCES users (id);
ALTER TABLE followers ADD FOREIGN KEY (followeeId) REFERENCES users (id);
ALTER TABLE likes ADD FOREIGN KEY (postId) REFERENCES posts (id);
ALTER TABLE likes ADD FOREIGN KEY (userId) REFERENCES users (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE users ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE posts ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE comments ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE dishes ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE restaurants ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE menus ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE tags ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE notifications ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE followers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE likes ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO users (id,username,password,bio,photo,role) VALUES
-- ('','','','','','');
-- INSERT INTO posts (id,content,image,likesDish,userID,dishId,recipe,restaurantId) VALUES
-- ('','','','','','','','');
-- INSERT INTO comments (id,content,postId,userId) VALUES
-- ('','','','');
-- INSERT INTO dishes (id,name) VALUES
-- ('','');
-- INSERT INTO restaurants (id,name,description,category,location) VALUES
-- ('','','','','');
-- INSERT INTO menus (id,dishId,restaurantId) VALUES
-- ('','','');
-- INSERT INTO tags (id,name,postId) VALUES
-- ('','','');
-- INSERT INTO notifications (id,Text,postId,seen,userId) VALUES
-- ('','','','','');
-- INSERT INTO followers (id,followerId,followeeId) VALUES
-- ('','','');
-- INSERT INTO likes (id,postId,userId) VALUES
-- ('','','');
