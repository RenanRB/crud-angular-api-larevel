<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CriarTabelaUsuarios extends Migration {
    public function up() {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome', 80);
            $table->string('email', 80)->unique();
            $table->string('cpf', 11)->unique();
            $table->string('login', 12)->unique();
            $table->string('password', 200);
            $table->text('endereco');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('usuarios');
    }
}
