<?php

namespace App\Services;

class UserService extends BaseService
{

    public function getOneByUsername($username)
    {
            $this->app['auth.service']->restricToUser($username);
            $user = $this->db->fetchAssoc("SELECT iduser, username, email, photo, role FROM user WHERE username=?", [(string) $username]);
            $this->app['monolog']->addDebug($user);
            if(!isset($user["iduser"])) {
                return ["data" => "error", "status" => 404];
            }
            return ["data" => $user, "status" => 200];
    }

    public function getOne($id)
    {
        return $this->db->fetchAssoc("SELECT * FROM user WHERE id=?", [(int) $id]);
    }

    public function getAll()
    {
        $this->app['monolog']->addDebug($this->app['auth.service']->getRole());
        $this->app['monolog']->addDebug($this->app['auth.service']->isGranted("ROLE_ADMIN") ? 'true' : 'false');
        return $this->db->fetchAll("SELECT * FROM user");
    }
}
