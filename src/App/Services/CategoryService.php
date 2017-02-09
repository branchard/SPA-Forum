<?php

namespace App\Services;

class CategoryService extends BaseService
{
    public function getAll()
    {
        $categories = $this->db->fetchAll("SELECT * FROM category");
        foreach ($categories as $key => $value){
            $categories[$key]['threads'] = "/api/v1/threads?categorie=" . $categories[$key]['idcategory'];
			$categories[$key]['lastPostDate'] = $this->db->fetchAssoc(
				"SELECT post.creationdate FROM post, thread ".
				"WHERE post.idthread = thread.idthread ".
				"AND thread.idcategory=? ORDER BY post.idpost DESC LIMIT 1",
				[$categories[$key]["idcategory"]]
			)["creationdate"];
        }
        return $categories;
    }
}
