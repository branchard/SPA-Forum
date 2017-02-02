INSERT INTO category
    SET label = 'Categorie 1';

INSERT INTO thread
    SET title = 'Premier thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    idcategory = LAST_INSERT_ID();

INSERT INTO post
    SET message = 'Message du premier thread',
    iduser = (
       SELECT iduser
       FROM user
       WHERE username = 'admin'),
    idthread = LAST_INSERT_ID();
