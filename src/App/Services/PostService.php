<?php

namespace App\Services;

class PostService extends BaseService
{
    public function getAll($threadId)
    {
        $posts = $this->db->fetchAll("SELECT * FROM post WHERE idthread=?", [(string) $threadId]);
        return $posts;
    }
}
