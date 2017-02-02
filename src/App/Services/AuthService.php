<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class AuthService extends BaseService
{

    private $rolesDict = array(
        0 => "ROLE_ADMIN",
        1 => "ROLE_MOD",
        2 => "ROLE_STANDARD"
    );

    private function roleNumberToString(int $role){
        if(!isset($this->rolesDict[$role]))
        {
            return "ROLE_NONE";
        }

        return $this->rolesDict[$role];
    }

    private function roleStringToNumber(string $role){
        return intval(array_keys($this->rolesDict, $role)[0]);
    }

    public function getRole()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']))
        {
            return "ROLE_NONE";
        }
        else
        {
            $username = $_SERVER['PHP_AUTH_USER'];
            $password = $_SERVER['PHP_AUTH_PW'];
            $roleInt = $this->db->fetchAssoc("SELECT role FROM user WHERE username=? AND password=?", [$username, $password])["role"];
            $this->app['monolog']->addDebug($roleInt);
            if(!isset($roleInt)){
                return "ROLE_NONE";
            }
            return $this->roleNumberToString($roleInt);
        }
    }

    public function isLogged() {
        return $this->getRole() !== "ROLE_NONE";
    }

    public function mustBeLogged(){
        $this->app['monolog']->addDebug("BEFORE !!!");
        if(!$this->isLogged())
        {
            $this->app->abort(401, "You must be logged");
        }
    }

    public function isGranted(string $minimumRole){
        if($minimumRole === "ROLE_NONE"){
            return true;
        }

        $role = $this->getRole();
        if($role === "ROLE_NONE"){
            return false;
        }

        return $this->roleStringToNumber($role) <= $this->roleStringToNumber($minimumRole);
    }

    public function restrict(string $minimumRole){
        if(!$this->isGranted($minimumRole))
        {
            $this->app->abort(403, "You must have " . $minimumRole . " rights");
        }
    }
}
