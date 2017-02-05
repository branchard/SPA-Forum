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

    public function getOneByUsername(Request $request)
    {
        $username = $request->query->get('username');
        $response = $this->userService->getOneByUsername($username);
        return new JsonResponse($response["data"], $response["status"]);
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
