-- DROP ALL TABLES

DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS thread;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user;

-- USER

CREATE TABLE user
  (
     iduser   INT(5) auto_increment NOT NULL UNIQUE,
     username VARCHAR(30) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL, /* sha-256 hash */
     email    VARCHAR(255) NOT NULL,
     photo    VARCHAR(255) NOT NULL,
     role     INT(2) NOT NULL DEFAULT 2, /* user privileges, 0 = admin, 1 = mod, 2 = normal */
     PRIMARY KEY (iduser)
  )
engine=innodb DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- THREAD

CREATE TABLE thread
  (
     idthread   INT(6) auto_increment NOT NULL UNIQUE,
     title      VARCHAR(255) NOT NULL UNIQUE,
     iduser     INT(5) NOT NULL,
     idcategory INT(4) NOT NULL,
     PRIMARY KEY (idthread)
  )
engine=innodb DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- POST

CREATE TABLE post
  (
     idpost   INT(6) auto_increment NOT NULL UNIQUE,
     message  TEXT NOT NULL,
     iduser   INT(5) NOT NULL,
     idthread INT(6) NOT NULL,
     PRIMARY KEY (idpost)
  )
engine=innodb DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- CATEGORY

CREATE TABLE category
  (
     idcategory INT(4) auto_increment NOT NULL UNIQUE,
     label      VARCHAR(255) NOT NULL UNIQUE,
     parentcategory INT(4) NULL,
     PRIMARY KEY (idcategory)
  )
engine=innodb DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

-- CONSTRAINTS

ALTER TABLE thread
  ADD CONSTRAINT fk_thread_iduser
    FOREIGN KEY (iduser)
    REFERENCES user (iduser)
    ON DELETE CASCADE;

ALTER TABLE thread
  ADD CONSTRAINT fk_thread_idcategory
  FOREIGN KEY (idcategory)
  REFERENCES category (idcategory)
  ON DELETE CASCADE;

ALTER TABLE post
  ADD CONSTRAINT fk_post_iduser
  FOREIGN KEY (iduser)
  REFERENCES user (iduser)
  ON DELETE CASCADE;

ALTER TABLE post
  ADD CONSTRAINT fk_post_idthread
  FOREIGN KEY (idthread)
  REFERENCES thread (idthread)
  ON DELETE CASCADE;

ALTER TABLE category
  ADD CONSTRAINT fk_category_idcategory
  FOREIGN KEY (parentcategory)
  REFERENCES category (idcategory)
  ON DELETE SET NULL;
