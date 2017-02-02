<?php

namespace App;

use Silex\Application;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class RoutesLoader
{
    private $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->instantiateControllers();

    }

    private function instantiateControllers()
    {
        $this->app['notes.controller'] = function() {
            return new Controllers\NotesController($this->app['notes.service']);
        };

        $this->app['root.controller'] = function() {
            return new Controllers\RootController($this->app);
        };

        $this->app['user.controller'] = function() {
            return new Controllers\UserController($this->app['user.service']);
        };
    }

    public function bindRoutesToControllers()
    {
        /* ROOT CONTROLLER */
        $this->app->get("/", "root.controller:index");

        /* REST API */
        $api = $this->app["controllers_factory"];

        /* USER */
        $api->get('/users', "user.controller:getAll")->before(function (Request $request, Application $app){
            $this->app['auth.service']->restrict("ROLE_ADMIN");
        });

        $api->get('/notes', "notes.controller:getAll");
        $api->get('/notes/{id}', "notes.controller:getOne");
        $api->post('/notes', "notes.controller:save");
        $api->put('/notes/{id}', "notes.controller:update");
        $api->delete('/notes/{id}', "notes.controller:delete");

        $this->app->mount($this->app["api.endpoint"].'/'.$this->app["api.version"], $api);
    }
}