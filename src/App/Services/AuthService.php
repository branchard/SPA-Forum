<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

class AuthService extends BaseService
{

    /*
        TODO: Il faudrait que le contructeur (de cette class), soit appelé au début
        du cycle de vie de la requette utilisateur, cela permetterait de faire
        un unique appel à la BDD et de stoker le role et le username dans les attribut
        de cet objet
    */

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

    // return sha-256 hash
    private function passwordToHash(string $password)
    {
        return hash("sha256", $password);
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
            $password = $this->passwordToHash($_SERVER['PHP_AUTH_PW']);
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
		error_log($role);
        if($role === "ROLE_NONE"){
            return false;
        }



        return $this->roleStringToNumber($role) <= $this->roleStringToNumber($minimumRole);
    }

    public function restrict(string $minimumRole)
	{
        if(!$this->isGranted($minimumRole))
        {
            $this->app->abort(403, "You must have " . $minimumRole . " rights");
        }
    }

	public function getUserId()
	{
		$username = $_SERVER['PHP_AUTH_USER'];
		$password = $this->passwordToHash($_SERVER['PHP_AUTH_PW']);
		$userId = $this->db->fetchAssoc("SELECT iduser FROM user WHERE username=? AND password=?", [$username, $password])["iduser"];
		return $userId;
	}

    // By default, the administrator has access to everything
    public function restricToUser(string $restricToUsername, $allowAccessToRole = "ROLE_ADMIN"){
        // if user role is < $allowAccessToRole
        if(!$this->isGranted($allowAccessToRole))
        {
            if (!isset($_SERVER['PHP_AUTH_USER']))
            {
                $this->app->abort(403, "You must be logged");
            }
            else
            {
                $username = $_SERVER['PHP_AUTH_USER'];
                $password = $this->passwordToHash($_SERVER['PHP_AUTH_PW']);
                $currentUsername = $this->db->fetchAssoc("SELECT username FROM user WHERE username=? AND password=?", [$username, $password])["username"];
                if (!isset($currentUsername))
                {
                    $this->app->abort(403, "wrong password or username");
                }

                if($currentUsername !== $restricToUsername)
                {
                    $this->app->abort(403, "Access not granted to you (" . $currentUsername . ")");
                }
            }
        }
    }
}
