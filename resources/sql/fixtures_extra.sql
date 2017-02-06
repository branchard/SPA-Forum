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

INSERT INTO post
    SET message = 'Message 1 du premier thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    creationdate = NOW(),
    idthread = @thread1;

INSERT INTO post
    SET message = 'Message 2 du premier thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    creationdate = NOW(),
    idthread = @thread1;

INSERT INTO post
    SET message = 'Message 3 du premier thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    creationdate = NOW(),
    idthread = @thread1;
