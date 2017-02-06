<?php

namespace App\Controllers;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class ThreadController
{

    protected $threadService;

    public function __construct($service)
    {
        $this->threadService = $service;
    }

    public function getAll()
    {
        return new JsonResponse($this->threadService->getAll());
    }

    public function getByCategory($id)
    {
        return new JsonResponse($this->threadService->getByCategory($id));
    }
}
