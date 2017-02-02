<?php

namespace App\Services;

class BaseService
{
    protected $db;
    protected $app;

    public function __construct($app, $db)
    {
        $this->app = $app;
        $this->db = $db;
    }

}
