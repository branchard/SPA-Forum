<?php

namespace App\Controllers;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class UserController
{

    protected $userService;

    public function __construct($service)
    {
        $this->userService = $service;
    }

    public function getOne($id)
    {
        return new JsonResponse($this->userService->getOne($id));
    }

    public function getAll()
    {
        return new JsonResponse($this->userService->getAll());
    }
}
