<?php

namespace App\Controllers;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;


class RootController
{
    private $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function index()
    {
        return $this->app->sendFile(ROOT_PATH . '/templates/index.html');
    }
}
