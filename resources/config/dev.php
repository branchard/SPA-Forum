<?php
require __DIR__ . '/prod.php';
$app['debug'] = true;
$app['log.level'] = Monolog\Logger::DEBUG;
// $app['db.options'] = array(
//   'driver' => 'pdo_sqlite',
//   'path' => realpath(ROOT_PATH . '/app.db'),
// );

/**
 * MySQL
 */
$app['db.options'] = array(
 "driver" => "pdo_mysql",
 "user" => "branchard",
 "password" => "branchard",
 "dbname" => "dbbranchard",
 "host" => "localhost",
);
