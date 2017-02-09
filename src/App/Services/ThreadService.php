<?php

namespace App\Services;

class ThreadService extends BaseService
{
    public function getAll()
    {
        $threads = $this->db->fetchAll("SELECT * FROM thread");
        /*foreach ($categories as $key => $value){
            $categories[$key]['threads'] = "/api/v1/threads?categorie=" . $categories[$key]['idcategory'];
        }*/
        return $threads;
    }

    public function getByCategory($id)
    {
        $threads = $this->db->fetchAll("SELECT * FROM thread WHERE idcategory=?", [(string) $id]);
        return $threads;
    }

	public function getOneById($id)
    {
        $thread = $this->db->fetchAssoc("SELECT * FROM thread WHERE idthread=?", [(string) $id]);
		$posts = $this->db->fetchAll("SELECT * FROM post WHERE idthread=?", [(string) $id]);
		foreach ($posts as $key => $value){
            $posts[$key]['user'] = $this->db->fetchAssoc(
				"SELECT username, photo FROM user WHERE iduser=?", [(string) $posts[$key]["iduser"]]
			);
        }
		$thread["posts"] = $posts;
        return $thread;
    }

	public function add($categoryId, $title, $message)
	{
		$userId = $this->app['auth.service']->getUserId();
		if(!isset($userId)){
			$this->app->abort(403, "You are not able to post this message");
		}

		$this->db->insert("thread", array(
			"title" => $title,
			"iduser" => $userId,
			"idcategory" => $categoryId
        ));

		$this->db->insert("post", array(
			"message" => $message,
			"iduser" => $userId,
			"idthread" => $this->db->lastInsertId(),
			"creationdate" => date("Y-m-d H:i:s")
        ));

        return $this->db->lastInsertId();
	}
}
