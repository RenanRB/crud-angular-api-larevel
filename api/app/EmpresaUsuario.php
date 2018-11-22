<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EmpresaUsuario extends Model {
    protected $table = 'empresa_usuario';

    protected $fillable = [
        'id_empresa', 'id_usuario'
    ];
}
