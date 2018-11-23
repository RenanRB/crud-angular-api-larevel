<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmpresaUsuario extends Model {
    protected $table = 'empresas_usuarios';

    protected $fillable = [
        'id_empresa', 'id_usuario'
    ];
}
