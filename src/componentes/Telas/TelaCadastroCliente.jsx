import { Alert } from "react-bootstrap";
import FormCadClientes from "./Formularios/FormCadCliente";
import Pagina from "../layouts/Pagina";
import { useState } from "react";
import TabelaClientes from "./Tabelas/TabelaClientes";
import { useEffect } from "react";
import { consultarCliente } from "../../servicos/servicoCliente";

export default function TelaCadastroCliente(props){
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false); 
    const [Clienteselecionado, setClienteselecionado] = useState({
        "id": 0,
        "nome": "",
        "email": "",
        "telefone": "",
        "cpf": ""
    }); 
    const [listaDeClientes,setListaDeClientes]=useState([]);

    useEffect(()=>{
        consultarCliente().then((lista)=>{
            if(lista.length>0)
                setListaDeClientes(lista);
            else
                setListaDeClientes([])
        });
      },[])

      useEffect(()=>{
        consultarCliente().then((lista)=>{
            if(lista.length>0)
                setListaDeClientes(lista);
            else
                setListaDeClientes([])
        });
      },[listaDeClientes])

    return(
        <div>
            <Pagina>
                <Alert className="mt-02 mb-02 success text-center" variant="success">
                    <h2>Cadastro de Cliente</h2>
                </Alert>
                {
                    exibirTabela ?
                        <TabelaClientes 
                            setExibirTabela={setExibirTabela}
                            setModoEdicao={setModoEdicao} 
                            setClienteselecionado={setClienteselecionado}
                            listaDeClientes={listaDeClientes} 
                            setListaDeClientes={setListaDeClientes}
                             
                            
                            
                        /> :
                        <FormCadClientes
                            listaDeClientes={listaDeClientes} 
                            setListaDeClientes={setListaDeClientes} 
                            setExibirTabela={setExibirTabela} 
                            Clienteselecionado={Clienteselecionado} 
                            modoEdicao={modoEdicao} 
                            setModoEdicao={setModoEdicao}
                        />
                }
            </Pagina>
        </div>

    );
}