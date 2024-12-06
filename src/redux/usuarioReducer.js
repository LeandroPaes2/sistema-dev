import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { consultarUsuario, gravarUsuario, alterarUsuario, excluirUsuario } from "../servicos/servicoUsuario";
import ESTADO from "./estados";

export const buscarUsuarios = createAsyncThunk('buscarUsuarios', async(id)=>{
    const resultado = await consultarUsuario(id);
    try{
        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Usuarios recuperados com sucesso",
                "listaDeUsuarios":resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os Usuarios do backend",
                "listaDeUsuarios": []
            }
        }
    }catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
            "listaDeUsuarios": []
        }

    }
});

export const apagarUsuario = createAsyncThunk('apagarUsuario', async(usuario)=>{
    const resultado = await excluirUsuario(usuario);
    try{
        if (resultado.status) {
            return {
                "status": true,
                "mensagem": "Usuario excluida com sucesso",
                "id":usuario.id
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao excluir os Usuarios do backend"
            }
        }
    }catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }

    }
});

export const incluirUsuario = createAsyncThunk('incluirUsuario', async(usuario)=>{
        const resultado = await gravarUsuario(usuario);
        try{
            if(resultado.status){
                usuario.id = resultado.id;
                return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                    "usuario":usuario
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

export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async(usuario)=>{
        const resultado = await alterarUsuario(usuario);
        try{
            if(resultado.status){
                usuario.id = resultado.id;
                return {
                    "status": resultado.status,
                    "mensagem": resultado.mensagem,
                    "usuario":usuario
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

const usuarioReducer = createSlice({
    name:"usuario",
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeUsuarios:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(buscarUsuarios.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (buscando Usuarios)"
        })
        .addCase(buscarUsuarios.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeUsuarios= action.payload.listaDeUsuarios
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
                state.listaDeUsuarios= action.payload.listaDeUsuarios
            }
        })
        .addCase(buscarUsuarios.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
                state.listaDeUsuarios= action.payload.listaDeUsuarios
        })
        .addCase(apagarUsuario.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (excluindo Usuarios)"
        })
        .addCase(apagarUsuario.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeUsuarios= state.listaDeUsuarios.filter((item)=>item.id!==action.payload.id)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(apagarUsuario.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(incluirUsuario.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (incluindo Usuarios)"
        })
        .addCase(incluirUsuario.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeUsuarios.push(action.payload.usuario)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(incluirUsuario.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
        .addCase(atualizarUsuario.pending,(state)=>{
             state.estado=ESTADO.PENDENTE
             state.mensagem= "Processando requisição (atualizando Usuarios)"
        })
        .addCase(atualizarUsuario.fulfilled,(state,action)=>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO;
                state.mensagem=action.payload.mensagem;
                state.listaDeUsuarios= state.listaDeUsuarios.map((item)=>item.id===action.payload.usuario.id ? action.payload.usuario : item)
            }
            else{
                state.estado=ESTADO.ERRO;
                state.mensagem=action.payload.mensagem;
            }
        })
        .addCase(atualizarUsuario.rejected, (state,action)=>{
            state.estado=ESTADO.ERRO;
            state.mensagem=action.payload.mensagem;
        })
    }
})

export default usuarioReducer.reducer;
