INSERT INTO category
    SET label = 'Categorie 1';
SET @category1 = LAST_INSERT_ID();

INSERT INTO category
    SET label = 'Categorie 2';
SET @category2 = LAST_INSERT_ID();

INSERT INTO category
    SET label = 'Categorie 3';
SET @category3 = LAST_INSERT_ID();

INSERT INTO thread
    SET title = 'Premier thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    idcategory = @category1;
SET @thread1 = LAST_INSERT_ID();

INSERT INTO thread
    SET title = 'Deuxieme thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    idcategory = @category1;

INSERT INTO thread
    SET title = 'Troisieme thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    idcategory = @category1;

SET @ipsum = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

INSERT INTO post
    SET message = @ipsum,
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    creationdate = NOW(),
    idthread = @thread1;

INSERT INTO post
    SET message = @ipsum,
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    creationdate = NOW(),
    idthread = @thread1;

INSERT INTO post
    SET message = @ipsum,
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    creationdate = NOW(),
    idthread = @thread1;
