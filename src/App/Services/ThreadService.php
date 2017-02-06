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


}
