<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Empresa;

class EmpresaController extends Controller
{
    public function index() {
        return Empresa::all();
    }

    public function get($id) {
        return Empresa::find($id);
    }

    public function cadastrar(Request $request) {
        $empresa = new Empresa();

        $empresa->nome = $request->nome;
        $empresa->cnpj = $request->cnpj;
        $empresa->endereco = $request->endereco;

        if ($empresa->save()) {
            return response()->json([
                'success' => 'Empresa cadastrada com sucesso!',
            ], 201);
        } else {
            return response()->json([
                'error' => 'Erro desconhecido!',
            ], 422);
        }
    }

    public function editar(Request $request, $id) {

        $empresa = Empresa::find($id);
        $empresa->nome = $request->nome;
        $empresa->cnpj = $request->cnpj;
        $empresa->endereco = $request->endereco;
        
        if ($empresa->save()) {
            return response()->json([
                'success' => 'Empresa editada com sucesso!',
            ], 201);
        } else {
            return response()->json([
                'error' => 'Erro desconhecido!',
            ], 422);
        }
    }
    public function excluir($id) {

        $empresa = Empresa::find($id);
        
        if ($empresa->delete()) {
            return response()->json([
                'success' => 'Empresa excluida com sucesso!',
            ], 200);
        } else {
            return response()->json([
                'error' => 'Erro desconhecido!',
            ], 422);
        }
    }
}
