<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('/usuarios')->group(function () {
    Route::get('/', 'UsuarioController@index');
    Route::get('/{id}', 'UsuarioController@get');
    Route::post('/', 'UsuarioController@cadastrar');
    Route::put('/{id}', 'UsuarioController@editar');
    Route::delete('/{id}', 'UsuarioController@excluir');
});

Route::prefix('/empresas')->group(function () {
    Route::get('/', 'EmpresaController@index');
    Route::get('/{id}', 'EmpresaController@get');
    Route::post('/', 'EmpresaController@cadastrar');
    Route::put('/{id}', 'EmpresaController@editar');
    Route::delete('/{id}', 'EmpresaController@excluir');
});
