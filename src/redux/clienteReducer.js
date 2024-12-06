import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { consultarCliente, gravarCliente, alterarCliente, excluirCliente } from "../servicos/servicoCliente";
import ESTADO from "./estados";

export const buscarClientes = createAsyncThunk('buscarClientes', async(codigo)=>{
    const resultado = await consultarCliente(codigo);
    try{
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Clientes recuperados com sucesso",
                "listaDeClientes":resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Clientes do backend",
                "listaDeClientes": []
            }
        }
    }catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
            "listaDeClientes": []
        }

    }
});

export const apagarCliente = createAsyncThunk('apagarCliente', async(cliente)=>{
    const resultado = await excluirCliente(cliente);
    try{
        if (resultado.status) {
            return {
                "status": true,
                "mensagem": "Cliente excluida com sucesso",
                "codigo":cliente.codigo
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao excluir os Clientes do backend"
            }
        }
    }catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }

    }
});

export const incluirCliente = createAsyncThunk('incluirCliente', async(cliente)=>{
        const resultado = await gravarCliente(cliente);
        try{
            if(resultado.status){
                cliente.codigo = resultado.codigo;
                return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                    "cliente":cliente
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

export const atualizarCliente = createAsyncThunk('atualizarCliente', async(cliente)=>{
        const resultado = await alterarCliente(cliente);
        try{
            if(resultado.status){
                cliente.codigo = resultado.codigo;
                return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                    "cliente":cliente
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

const clienteReducer = createSlice({
    name:"cliente",
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeClientes:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(buscarClientes.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (buscando Clientes)"
        })
        .addCase(buscarClientes.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeClientes= action.payload.listaDeClientes
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
                state.listaDeClientes= action.payload.listaDeClientes
            }
        })
        .addCase(buscarClientes.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
                state.listaDeClientes= action.payload.listaDeClientes
        })
        .addCase(apagarCliente.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (excluindo Clientes)"
        })
        .addCase(apagarCliente.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeClientes= state.listaDeClientes.filter((item)=>item.codigo!==action.payload.codigo)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(apagarCliente.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(incluirCliente.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (incluindo Clientes)"
        })
        .addCase(incluirCliente.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeClientes.push(action.payload.cliente)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(incluirCliente.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarCliente.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (atualizando Clientes)"
        })
        .addCase(atualizarCliente.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeClientes= state.listaDeClientes.map((item)=>item.codigo===action.payload.cliente.codigo ? action.payload.cliente : item)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarCliente.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
})

export default ClienteReducer.reducer;
