import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarProduto,excluirProduto, gravarProduto, alterarProduto } from "../servicos/servicoProduto";



export const buscarProdutos = createAsyncThunk('buscarProdutos', async () => {
    const resultado = await consultarProduto();
    try {

        if (Array.isArray(resultado)) {
            return {
                "status": true,
                "mensagem": "Produtos recuperados com sucesso",
                "listaDeProdutos":resultado
            }
        }
        else {
            return {
                "status": false,
                "mensagem": "Erro ao recuperar os produtos do backend",
                "listaDeProdutos": []
            }
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
            "listaDeProdutos": []
        }

    }
});

export const apagarProduto= createAsyncThunk('apagarProduto', async (produto)=>{
    //dar previsibilidade  ao conteudo do payload
    const resultado = await excluirProduto(produto);
    try {
        return {
            "status": resultado.status,
            "mensagem": resultado.mensagem,
            "codigo":produto.codigo
        }
    } catch (erro) {
        return {
            "status": false,
            "mensagem": "Erro :" + erro.message,
        }
    
    }

});

export const incluirProduto = createAsyncThunk('incluirProduto', async (produto) =>{
    try{

        const resultado = await gravarProduto(produto);
        if(resultado.status){
            produto.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":produto.codigo
                "produto":produto
            }
        }
        else{
             return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":produto.codigo
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
export const atualizarProduto = createAsyncThunk('atualizarProduto', async (produto) =>{
    try{

        const resultado = await alterarProduto(produto);
        if(resultado.status){
            produto.codigo = resultado.codigo;
            return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":produto.codigo
                "produto":produto
            }
        }
        else{
             return {
                "status": resultado.status,
                "mensagem": resultado.mensagem,
                //"codigo":produto.codigo
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

const produtoReducer = createSlice({
    name: "produto",
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaDeProdutos: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buscarProdutos.pending, (state, action) => {
            state.estado=ESTADO.PENDENTE
            state.mensagem= "Processando requisição (buscando produtos)"
        })
        .addCase(buscarProdutos.fulfilled, (state, action) => { 
                if(action.payload.status){
                    state.estado=ESTADO.OCIOSO
                    state.mensagem=action.payload.mensagem
                    state.listaDeProdutos=action.payload.listaDeProdutos
                }
                else{
                    state.estado=ESTADO.ERRO;
                    state.mensagem=action.payload.mensagem
                    state.listaDeProdutos=action.payload.listaDeProdutos
                }
            })
            .addCase(buscarProdutos.rejected, (state, action) => {
                state.estado=ESTADO.ERRO
                state.mensagem=action.payload.mensagem
                state.listaDeProdutos=action.payload.listaDeProdutos
            })
            .addCase(apagarProduto.pending, (state, action)=>{
                state.estado = ESTADO.PENDENTE
                state.mensagem = "Processando requisição (excluiindo o produto do backend)"
            })
            .addCase(apagarProduto.fulfilled, (state,action)=>{
                state.mensagem= action.payload.mensagem
                if(action.payload.status){
                    
                    state.estado=ESTADO.OCIOSO
                    state.listaDeProdutos = state.listaDeProdutos.filter((item)=> item.codigo !== action.payload.codigo)
                }else{
                    state.estado=ESTADO.ERRO
                }
                //altera a lista de produto??
            })
            .addCase(apagarProduto.rejected, (state,action)=>{
                state.estado=ESTADO.ERRO
                //state.mensagem=action.payload.mensagem
            })
            .addCase(incluirProduto.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (inclusão do produto no backend)"
            })
            .addCase(incluirProduto.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeProdutos.push(action.payload.produto)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(incluirProduto.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
            .addCase(atualizarProduto.pending,(state,action)=>{
                state.estado=ESTADO.PENDENTE;
                state.mensagem="Processando a requisição (Atualização do produto no backend)"
            })
            .addCase(atualizarProduto.fulfilled,(state,action)=>{
                if(action.payload.status){
                    state.estado= ESTADO.OCIOSO;
                    state.mensagem= action.payload.mensagem;
                    state.listaDeProdutos = state.listaDeProdutos.map((item)=> item.codigo === action.payload.produto.codigo ? action.payload.produto : item)
                }
                else{
                    state.estado = ESTADO.ERRO;
                    state.mensagem= action.payload.mensagem;
                }
            })
            .addCase(atualizarProduto.rejected,(state,action)=>{
                state.estado=ESTADO.ERRO;
                state.mensagem= action.payload.mensagem;

            })
    }
})



export default produtoReducer.reducer;