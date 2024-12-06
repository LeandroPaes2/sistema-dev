import { Alert } from "react-bootstrap";
import FormCadUsuarios from "./Formularios/FormCadUsuario";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";
import { useEffect } from "react";
import { consultarUsuario } from "../../servicos/servicoUsuario";

export default function TelaCadastroUsuario(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false); 
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        "codigo": 0,
        "nome": "",
        "endereco": "",
        "contato": "",
        "cpf": ""
    }); 
    const [listaDeUsuarios,setListaDeUsuarios]=useState([]);

    useEffect(()=>{
        consultarUsuario().then((lista)=>{
            if(lista.length>0)
                setListaDeUsuarios(lista);
            else
                setListaDeUsuarios([])
        });
      },[])

      useEffect(()=>{
        consultarUsuario().then((lista)=>{
            if(lista.length>0)
                setListaDeUsuarios(lista);
            else
                setListaDeUsuarios([])
        });
      },[listaDeUsuarios])

    return(
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Usuario</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaUsuarios 
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao} 
                            setUsuarioSelecionado={setUsuarioSelecionado}
                            listaDeUsuarios={listaDeUsuarios} 
                            setListaDeUsuarios={setListaDeUsuarios}
                             
                            
                            
                        /> :
                        <FormCadUsuarios
                            listaDeUsuarios={listaDeUsuarios} 
                            setListaDeUsuarios={setListaDeUsuarios} 
                            setExibirTabela={setExibirTabela} 
                            usuarioSelecionado={usuarioSelecionado} 
                            modoEdicao={modoEdicao} 
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </div>

    );
}