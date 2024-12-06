import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import categoriaReducer from "./categoriaReducer";
import fornecedorReducer from "./fornecedorReducer";

const store = configureStore({
    reducer:{
        'produto':produtoReducer,
        'categoria':categoriaReducer,
        'fornecedor':fornecedorReducer
    }
});

export default store;