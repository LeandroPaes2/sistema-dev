import { Alert } from "react-bootstrap";
import FormCadFornecedores from "./Formularios/FormCadFornecedor";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";

export default function TelaCadastroFornecedor(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false); 
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        "codigo": 0,
        "nome": "",
        "endereco": "",
        "contato": "",
        "cpf": ""
    }); 

    return(
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Fornecedor</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaFornecedores 
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao} 
                            setFornecedorSelecionado={setFornecedorSelecionado}
                             
                            
                            
                        /> :
                        <FormCadFornecedores
                            setExibirTabela={setExibirTabela} 
                            fornecedorSelecionado={fornecedorSelecionado} 
                            modoEdicao={modoEdicao} 
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </div>

    );
}