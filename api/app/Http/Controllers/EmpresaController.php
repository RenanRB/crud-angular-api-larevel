<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Empresa;

class EmpresaController extends Controller
{
    public function index() {
        return Empresa::with('usuarios')->get();
    }

    public function get($id) {
        return Empresa::with('usuarios')->find($id);
    }

    public function cadastrar(Request $request) {

        $messages = [
            'required' => 'O campo :attribute é obrigatório.',
            'unique' => 'O :attribute já está em uso.',
            'digits' => 'O campo :attribute tem que ter :digits digitos.',
            'min' => 'O campo :attribute tem que ter no minimo :min caracteres.',
            'max' => 'O campo :attribute tem que ter no máximo :max caracteres.',
            'numeric' => 'O campo :attribute tem que ser somente números.',
        ];

        $rules = [
            'nome' => 'required|min:3|max:80',
            'cnpj' => 'required|numeric|digits:14|unique:empresas,cnpj',
            'endereco' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {

            return response()->json([
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $empresa = new Empresa();
        $empresa->nome = $request->nome;
        $empresa->cnpj = $request->cnpj;
        $empresa->endereco = $request->endereco;

        try {
            $empresa->save();
            if (isset($request->usuarios) && count($request->usuarios) && $request->usuarios[0]) {
                $empresa->usuarios()->sync($request->usuarios);
            }
            return response()->json([
                'message' => 'Empresa cadastrada com sucesso!',
            ], 201);
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'message' => 'Erro ao realizar a inserção no banco de dados, caso o problema persista contate o suporte!',
            ], 422);
        }
    }

    public function editar(Request $request, $id) {

        $empresa = Empresa::find($id);

        $messages = [
            'required' => 'O campo :attribute é obrigatório.',
            'unique' => 'O :attribute já está em uso.',
            'digits' => 'O campo :attribute tem que ter :digits digitos.',
            'min' => 'O campo :attribute tem que ter no minimo :min caracteres.',
            'max' => 'O campo :attribute tem que ter no máximo :max caracteres.',
            'numeric' => 'O campo :attribute tem que ser somente números.',
        ];

        $rules = [
            'nome' => 'required|min:3|max:80',
            'cnpj' => 'required|numeric|digits:14|unique:empresas,cnpj,'.$empresa->id,
            'endereco' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->fails()) {

            return response()->json([
                'message' => $validator->errors()->first(),
            ], 422);
        }

        $empresa->nome = $request->nome;
        $empresa->cnpj = $request->cnpj;
        $empresa->endereco = $request->endereco;

        try {
            $empresa->save();
            if (isset($request->usuarios) && count($request->usuarios) && $request->usuarios[0]) {
                $empresa->usuarios()->sync($request->usuarios);
            } else {
                $empresa->usuarios()->detach();
            }

            return response()->json([
                'message' => 'Empresa editada com sucesso!',
            ], 201);
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'message' => 'Erro ao realizar a edição no banco de dados, caso o problema persista contate o suporte!',
            ], 422);
        }
    }
    public function excluir($id) {

        $empresa = Empresa::find($id);

        try {
            $empresa->delete();
            return response()->json([
                'message' => 'Empresa excluida com sucesso!',
            ], 200);
        } catch(\Illuminate\Database\QueryException $ex){
            return response()->json([
                'message' => 'Erro ao realizar a exclusão no banco de dados, caso o problema persista contate o suporte!',
            ], 422);
        }
    }
}
