import { useState} from 'react';
import { Button, Spinner, Col, Form, Row, Alert } from 'react-bootstrap';
import  { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { atualizarCategoria, incluirCategoria } from '../../../redux/categoriaReducer';

import ESTADO from "../../../redux/estados";

export default function FormCadCategoria(props) {
    const [validated, setValidated] = useState(false);
    const { estado, mensagem } = useSelector((state) => state.categoria)
    const dispachante = useDispatch();

    function zeraCategoria() {
        props.setCategoriaSelecionada({
        "codigo": 0,
        "descricao": ""
        });
    }

    const manipularSubmissao = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            if (props.modoEdicao) {
                dispachante(atualizarCategoria(props.categoria));
                setTimeout(() => {
                    props.setExibirTabela(true);
                    props.setModoEdicao(false);
                    zeraCategoria();
                }, 2000)
            }
        else {
            dispachante(incluirCategoria(props.categoria));
            setTimeout(() => {
                props.setExibirTabela(true);
                props.setModoEdicao(false);
                zeraCategoria();
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
            props.setCategoriaSelecionada({
                ...props.categoria,
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
            return (
                <Form noValidate validated={validated} onSubmit={manipularSubmissao}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                            <Form.Label>Código</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="codigo"
                                name="codigo"
                                value={props.categoria?.codigo || 0}
                                disabled={props.modoEdicao}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Por favor, informe o código da categoria!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-4" controlId="validationCustom05">
                        <Form.Group as={Col} md="12">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="descricao"
                                name="descricao"
                                value={props.categoria?.descricao || ""}
                                onChange={manipularMudanca}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, informe a descrição da categoria!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className='mt-2 mb-2'>
                        <Col md={1}>
                            <Button type="submit">{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
                        </Col>
                        <Col md={{ offset: 1 }}>
                            <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                        </Col>
                    </Row>
                    <Toaster position="top-right"/>
                </Form>
            );
        }
    
}