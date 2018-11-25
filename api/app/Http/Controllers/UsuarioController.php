<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
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
        $messages = [
            'required' => 'O campo :attribute é obrigatório.',
            'unique' => 'O :attribute já está em uso.',
            'email' => 'O :attribute não está em um formato válido.',
            'size' => 'O campo :attribute tem que ter :size digitos.',
            'min' => 'O campo :attribute tem que ter no minimo :min caracteres.',
            'max' => 'O campo :attribute tem que ter no máximo :max caracteres.',
            'numeric' => 'O campo :attribute tem que ser somente números.',
        ];

        $rules = [
            'nome' => 'required|min:3|max:80',
            'cpf' => 'required|numeric|unique:usuarios,cpf|digits:11',
            'email' => 'required|email|min:3|max:80|unique:usuarios,email',
            'login' => 'required|min:3|max:12|unique:usuarios,login',
            'password' => 'required|min:3|max:32',
            'endereco' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {

            return response()->json([
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $usuario = new Usuario();

        $usuario->nome = $request->nome;
        $usuario->cpf = $request->cpf;
        $usuario->email = $request->email;
        $usuario->login = $request->login;
        $usuario->password = $request->password;
        $usuario->endereco = $request->endereco;

        try {
            $usuario->save();
            if (isset($request->empresas) && count($request->empresas) && $request->empresas[0]) {
                $usuario->empresas()->sync($request->empresas);
            }

            return response()->json([
                'message' => 'Usuário cadastrado com sucesso!',
            ], 201);
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'message' => 'Erro ao realizar a inserção no banco de dados, caso o problema persista contate o suporte!',
            ], 422);
        }
    }

    public function editar(Request $request, $id) {

        $usuario = Usuario::with('empresas')->find($id);

        $messages = [
            'required' => 'O campo :attribute é obrigatório.',
            'unique' => 'O :attribute já está em uso.',
            'email' => 'O :attribute não está em um formato válido.',
            'digits' => 'O campo :attribute tem que ter :digits digitos.',
            'min' => 'O campo :attribute tem que ter no minimo :min caracteres.',
            'max' => 'O campo :attribute tem que ter no máximo :max caracteres.',
            'numeric' => 'O campo :attribute tem que ser somente números.',
        ];

        $rules = [
            'nome' => 'required|min:3|max:80',
            'cpf' => 'required|numeric|digits:11|unique:usuarios,cpf,'.$usuario->id,
            'email' => 'required|email|min:3|max:80|unique:usuarios,email,'.$usuario->id,
            'login' => 'required|min:3|max:12|unique:usuarios,login,'.$usuario->id  ,
            'password' => 'nullable|min:3|max:32',
            'endereco' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {

            return response()->json([
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $usuario->nome = $request->nome;
        $usuario->cpf = $request->cpf;
        $usuario->email = $request->email;
        $usuario->login = $request->login;
        if ($request->password) {
            $usuario->password = $request->password;
        }
        $usuario->endereco = $request->endereco;

        try {
            $usuario->save();
            if (isset($request->empresas) && count($request->empresas) && $request->empresas[0]) {
                $usuario->empresas()->sync($request->empresas);
            } else {
                $usuario->empresas()->detach();
            }

            return response()->json([
                'message' => 'Usuário editado com sucesso!',
            ], 201);
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'message' => 'Erro ao realizar a edição no banco de dados, caso o problema persista contate o suporte!',
            ], 422);
        }
    }

    public function excluir($id) {

        $usuario = Usuario::find($id);

        try {
            $usuario->delete();
            return response()->json([
                'message' => 'Usuário excluido com sucesso!',
            ], 200);
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'message' => 'Erro ao realizar a exclusão no banco de dados, caso o problema persista contate o suporte!',
            ], 422);
        }
    }
}
