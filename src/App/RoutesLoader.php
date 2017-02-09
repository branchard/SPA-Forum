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

        $this->app['category.controller'] = function() {
            return new Controllers\CategoryController($this->app['category.service']);
        };

        $this->app['thread.controller'] = function() {
            return new Controllers\ThreadController($this->app['thread.service']);
        };

        $this->app['post.controller'] = function() {
            return new Controllers\PostController($this->app['post.service']);
        };
    }

    public function bindRoutesToControllers()
    {
        /* REST API */
        $api = $this->app["controllers_factory"];

        /* USER */
        $api->get('/users', "user.controller:getAll")->before(function (Request $request, Application $app){
            $this->app['auth.service']->restrict("ROLE_ADMIN");
        });

        $api->get('/user', "user.controller:getOneByUsername");

        $api->post('/users', function(Request $request){
            $user = $request->request->get("firstName");
            return "$user";
        })->before(function (Request $request, Application $app){
            $this->app['auth.service']->restrict("ROLE_STANDARD");
        });

        /* CATEGORY */
        $api->get('/categories', "category.controller:getAll");

        /* THREAD */
        $api->get('/threads', "thread.controller:getAll");
        $api->get('/threads/{id}', "thread.controller:getByCategory");
		$api->get('/thread/{id}', "thread.controller:getOneById");
		$api->post('/thread', "thread.controller:add")->before(function (Request $request, Application $app){
	        $this->app['auth.service']->restrict("ROLE_STANDARD");// must be connected
	    });

        /* POST */
        $api->get('/posts/{threadId}', "post.controller:getAll");
		$api->post('/post', "post.controller:add")->before(function (Request $request, Application $app){
	        $this->app['auth.service']->restrict("ROLE_STANDARD");// must be connected
	    });

        $api->get('/toto', "notes.controller:getAll");
        $api->get('/toto/{id}', "notes.controller:getOne");
        $api->post('/toto', "notes.controller:save");
        $api->put('/toto/{id}', "notes.controller:update");
        $api->delete('/toto/{id}', "notes.controller:delete");

        $this->app->mount($this->app["api.endpoint"].'/'.$this->app["api.version"], $api);

        /* ROOT CONTROLLER */
        $this->app->get("/{url}", "root.controller:index")->assert("url", ".*");;
    }
}
