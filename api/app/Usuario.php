<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model {
    protected $table = 'usuarios';

    protected $fillable = [
        'id', 'nome', 'cpf', 'email', 'login', 'password', 'endereco'
    ];

    protected $hidden = array('password', 'created_at', 'updated_at');

    protected $dates =  ['created_at', 'updated_at'];

    public function empresas() {
        return $this->belongsToMany('App\Empresa', 'empresas_usuarios', 'id_empresa', 'id_usuario')
        ->withTimestamps();
    }

    public function setPasswordAttribute($pass) {
        $this->attributes['password'] = bcrypt($pass);
    }

}
