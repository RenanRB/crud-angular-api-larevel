<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use App\Empresa;
use App\EmpresaUsuario;

class UsuarioController extends Controller
{
    public function index() {
        return Usuario::with('empresas')->get();
    }

    public function get($id) {
        return Usuario::with('empresas')->find($id);
    }

    public function cadastrar(Request $request) {
        $usuario = new Usuario();

        $usuario->nome = $request->nome;
        $usuario->cpf = $request->cpf;
        $usuario->email = $request->email;
        $usuario->login = $request->login;
        $usuario->password = $request->password;
        $usuario->endereco = $request->endereco;

        if ($usuario->save()) {
            if ($request->empresas && count($request->empresas)) {
                foreach ($request->empresas as $empId) {
                    $empresa = Empresa::find($empId);
                    $usuario->empresas()->save($empresa);
                }
            }

            return response()->json([
                'success' => 'Usuário cadastrado com sucesso!',
            ], 201);
        } else {
            return response()->json([
                'error' => 'Erro desconhecido!',
            ], 422);
        }
    }

    public function editar(Request $request, $id) {

        $usuario = Usuario::find($id);
        $usuario->nome = $request->nome;
        $usuario->cpf = $request->cpf;
        $usuario->email = $request->email;
        $usuario->login = $request->login;
        $usuario->password = $request->password;
        $usuario->endereco = $request->endereco;

        if ($usuario->save()) {
            if ($request->empresas && count($request->empresas)) {
                foreach ($request->empresas as $empId) {
                    $empresa = Empresa::find($empId);
                    $usuario->empresas()->save($empresa);
                }
            }

            return response()->json([
                'success' => 'Usuário editado com sucesso!',
            ], 201);
        } else {
            return response()->json([
                'error' => 'Erro desconhecido!',
            ], 422);
        }
    }

    public function excluir($id) {

        $usuario = Usuario::find($id);

        if ($usuario->delete()) {
            return response()->json([
                'success' => 'Usuário excluido com sucesso!',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Erro desconhecido!',
            ], 422);
        }
    }
}
