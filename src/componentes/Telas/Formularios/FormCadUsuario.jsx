import { useState} from 'react';
import { Button, Spinner, Col, Form, Row, Alert } from 'react-bootstrap';
import  { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { atualizarUsuario, incluirUsuario } from '../../../redux/usuarioReducer';


import ESTADO from "../../../redux/estados";


export default function FormCadUsuarios(props){
    const [validated, setValidated] = useState(false);
    const { estado, mensagem } = useSelector((state) => state.categoria)
    const dispachante = useDispatch();

    function zeraUsuario() {
        props.setUsuarioSelecionado({
        "codigo": 0,
        "nome": "",
        "endereco": "",
        "contato": "",
        "cpf": ""
        });
    }

    const manipularSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                dispachante(atualizarUsuario(props.usuario));
                setTimeout(() => {
                    props.setExibirTabela(true);
                    props.setModoEdicao(false);
                    zeraUsuario();
                }, 2000)
            }
        else {
            dispachante(incluirUsuario(props.usuario));
            setTimeout(() => {
                props.setExibirTabela(true);
                props.setModoEdicao(false);
                zeraUsuario();
            }, 2000)
        }
        }
        else
            setValidated(true);
        event.preventDefault();
        event.stopPropagation();
        };

    function manipularMudanca(event) {
        const id = event.currentTarget.id;
            const valor = event.currentTarget.value;
            console.log("Mudando valor de", id, "para", valor);
            props.setUsuarioSelecionada({
                ...props.usuario,
                [id]: valor
            });
    }

    if (estado === ESTADO.PENDENTE) {
        return (
        <div>
    
            <Spinner animation="border" role="status"></Spinner>
            <Alert variant="primary">{mensagem}</Alert>
        </div>
        )
    }
    else
    if (estado === ESTADO.ERRO) {
        return (
        <div>
            <Alert variant="danger">{mensagem}</Alert>
            <Button onClick={() => {
                props.setExibirTabela(true);
                props.setModoEdicao(false);
            }}>Voltar</Button>
        </div>
        )
    }
    else
    {

    return(
        <Form noValidate validated={validated} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={props.usuario.codigo}
                        onChange={manipularMudanca}
                        disabled={props.modoEdicao}  
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={props.usuario.nome}
                        onChange={manipularMudanca}  
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o Nome do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={props.usuario.endereco}
                        onChange={manipularMudanca}  
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o Endereço do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Contato</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="contato"
                        name="contato"
                        value={props.usuario.contato}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o Contato do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={props.usuario.cpf}
                        onChange={manipularMudanca} 
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o CPF do usuario!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">
                        {props.modoEdicao ? "Atualizar" : "Confirmar"}
                    </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                <Button onClick={()=>{
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right"/>
        </Form>

    );
    }
}