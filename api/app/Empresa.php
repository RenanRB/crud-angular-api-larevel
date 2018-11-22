<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model {
    protected $table = 'empresas';

    protected $fillable = [
        'id', 'nome', 'cnpj', 'endereco'
    ];
	
	protected $hidden = array('created_at', 'updated_at');
	
    protected $dates =  ['created_at', 'updated_at'];

    public function usuarios() {
        return $this->belongsToMany('App\Usuario', 'empresas_usuarios', 'id_usuario', 'id_empresa')
        ->withTimestamps();
    }
}
