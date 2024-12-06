import { Alert } from "react-bootstrap";
import FormCadCategoria from "./Formularios/FormCadCategoria";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaCategorias from "./Tabelas/TabelaCategorias";
import { consultarCategoria } from "../../servicos/servicoCategoria";
import { useEffect } from "react";

export default function TelaCadastroCategoria(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState({
        "codigo": 0,
        "descricao": "",
    });
    const [listaDeCategorias,setListaDeCategorias]=useState([]);

    useEffect(()=>{
        consultarCategoria().then((lista)=>{
            if(lista.length>0)
                setListaDeCategorias(lista);
            else
                setListaDeCategorias([])
        });
      },[])

      useEffect(()=>{
        consultarCategoria().then((lista)=>{
            if(lista.length>0)
                setListaDeCategorias(lista);
            else
                setListaDeCategorias([])
        });
      },[listaDeCategorias])

    return (
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Categoria</h2>
                </Alert>
                {
                    exibirTabela ?
                    <TabelaCategorias 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setCategoriaSelecionada={setCategoriaSelecionada} 
                                        listaDeCategorias={listaDeCategorias} 
                                        setListaDeCategorias={setListaDeCategorias}/> :
                    <FormCadCategoria 
                                        setExibirTabela={setExibirTabela}
                                        setModoEdicao={setModoEdicao}
                                        setCategoriaSelecionada={setCategoriaSelecionada}
                                        listaDeCategorias={listaDeCategorias} 
                                        etListaDeCategorias={setListaDeCategorias}
                                        modoEdicao={modoEdicao}
                                        categoriaSelecionada={categoriaSelecionada}
                                        />
                }
            </Pagina>
        </div>
    );
}
