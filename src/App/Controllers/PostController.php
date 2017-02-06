<?php

namespace App\Controllers;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class PostController
{
    protected $postService;

    public function __construct($service)
    {
        $this->postService = $service;
    }

    public function getAll($threadId)
    {
        return new JsonResponse($this->postService->getAll($threadId));
    }
}
