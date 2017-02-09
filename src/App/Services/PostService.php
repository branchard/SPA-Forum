<?php

namespace App\Services;

class PostService extends BaseService
{
    public function getAll($threadId)
    {
        $posts = $this->db->fetchAll("SELECT * FROM post WHERE idthread=?", [(string) $threadId]);
		foreach ($posts as $key => $value){
            $posts[$key]['user'] = $this->db->fetchAll(
				"SELECT username, photo FROM user WHERE iduser=?", [(string) $posts[$key]["iduser"]]
			);
        }
        return $posts;
    }

	public function add($threadId, $message)
	{
		$userId = $this->app['auth.service']->getUserId();
		if(!isset($userId)){
			$this->app->abort(403, "You are not able to post this message");
		}

		$this->db->insert("post", array(
            "message" => $message,
			"iduser" => $userId,
			"idthread" => $threadId,
			"creationdate" => date("Y-m-d H:i:s")
        ));
        return $this->db->lastInsertId();
	}
}
