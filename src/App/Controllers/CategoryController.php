<?php

namespace App\Controllers;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class CategoryController
{

    protected $categoryService;

    public function __construct($service)
    {
        $this->categoryService = $service;
    }

    public function getAll()
    {
        return new JsonResponse($this->categoryService->getAll());
    }
}
