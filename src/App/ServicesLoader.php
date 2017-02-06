<?php

namespace App;

use Silex\Application;

class ServicesLoader
{
    protected $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
    }

    public function bindServicesIntoContainer()
    {
        $this->app['auth.service'] = new Services\AuthService($this->app, $this->app["db"]);

        $this->app['notes.service'] = function() {
            return new Services\NotesService($this->app, $this->app["db"]);
        };

        $this->app['user.service'] = function() {
            return new Services\UserService($this->app, $this->app["db"]);
        };

        $this->app['category.service'] = function() {
            return new Services\CategoryService($this->app, $this->app["db"]);
        };

        $this->app['thread.service'] = function() {
            return new Services\ThreadService($this->app, $this->app["db"]);
        };

        $this->app['post.service'] = function() {
            return new Services\PostService($this->app, $this->app["db"]);
        };
    }
}
