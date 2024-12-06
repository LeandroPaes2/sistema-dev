import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { consultarFornecedor, gravarFornecedor, alterarFornecedor, excluirFornecedor } from "../servicos/servicoFornecedor";
import ESTADO from "./estados";

export const buscarFornecedores = createAsyncThunk('buscarFornecedores', async(codigo)=>{
    const resultado = await consultarFornecedor(codigo);
    try{
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Fornecedores recuperados com sucesso",
                "listaDeFornecedores":resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Fornecedores do backend",
                "listaDeFornecedores": []
            }
        }
    }catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
            "listaDeFornecedores": []
        }

    }
});

export const apagarFornecedor = createAsyncThunk('apagarFornecedor', async(fornecedor)=>{
    const resultado = await excluirFornecedor(fornecedor);
    try{
        if (resultado.status) {
            return {
                "status": true,
                "mensagem": "Fornecedor excluida com sucesso",
                "codigo":fornecedor.codigo
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao excluir os fornecedores do backend"
            }
        }
    }catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }

    }
});

export const incluirFornecedor = createAsyncThunk('incluirFornecedor', async(fornecedor)=>{
        const resultado = await gravarFornecedor(fornecedor);
        try{
            if(resultado.status){
                fornecedor.codigo = resultado.codigo;
                return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                    "fornecedor":fornecedor
                }
            }
            else{
                 return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                }
            }
        }
        catch(erro){
            return{
                "status": false,
               "mensagem": "Erro :" + erro.message,
            }
        }
})

export const atualizarFornecedor = createAsyncThunk('atualizarFornecedor', async(fornecedor)=>{
        const resultado = await alterarFornecedor(fornecedor);
        try{
            if(resultado.status){
                fornecedor.codigo = resultado.codigo;
                return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                    "fornecedor":fornecedor
                }
            }
            else{
                 return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                }
            }
        }
        catch(erro){
            return{
                "status": false,
               "mensagem": "Erro :" + erro.message,
            }
        }
})

const fornecedorReducer = createSlice({
    name:"fornecedor",
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeFornecedores:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(buscarFornecedores.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (buscando fornecedores)"
        })
        .addCase(buscarFornecedores.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeFornecedores= action.payload.listaDeFornecedores
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
                state.listaDeFornecedores= action.payload.listaDeFornecedores
            }
        })
        .addCase(buscarFornecedores.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
                state.listaDeFornecedores= action.payload.listaDeFornecedores
        })
        .addCase(apagarFornecedor.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (excluindo fornecedores)"
        })
        .addCase(apagarFornecedor.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeFornecedores= state.listaDeFornecedores.filter((item)=>item.codigo!==action.payload.codigo)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(apagarFornecedor.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(incluirFornecedor.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (incluindo fornecedores)"
        })
        .addCase(incluirFornecedor.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeFornecedores.push(action.payload.fornecedor)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(incluirFornecedor.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarFornecedor.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (atualizando fornecedores)"
        })
        .addCase(atualizarFornecedor.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeFornecedores= state.listaDeFornecedores.map((item)=>item.codigo===action.payload.fornecedor.codigo ? action.payload.fornecedor : item)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarFornecedor.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
})

export default fornecedorReducer.reducer;