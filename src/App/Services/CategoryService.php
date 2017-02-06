<?php

namespace App\Services;

class CategoryService extends BaseService
{
    public function getAll()
    {
        $categories = $this->db->fetchAll("SELECT * FROM category");
        foreach ($categories as $key => $value){
            $categories[$key]['threads'] = "/api/v1/threads?categorie=" . $categories[$key]['idcategory'];
        }
        return $categories;
    }


}
