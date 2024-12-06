import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { gravarFornecedor } from '../../../servicos/servicoFornecedor';

export default function FormCadFornecedores(props) {
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState(props.fornecedorSelecionado || {
        codigo: '',
        nome: '',
        endereco: '',
        contato: '',
        cpf: ''
    });
    const [formValidado, setFormValidado] = useState(false);

    // Função para manipular o envio do formulário
    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        // Verifica se o formulário é válido
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                console.log('Gravando fornecedor...', fornecedorSelecionado); // Log para depuração
                gravarFornecedor(fornecedorSelecionado)
                    .then((resultado) => {
                        console.log('Resultado da gravação:', resultado); // Log para depuração
                        if (resultado.status) {
                            props.setExibirTabela(true);
                        } else {
                            toast.error(resultado.mensagem);
                        }
                    })
                    .catch((erro) => {
                        console.error('Erro ao gravar fornecedor:', erro); // Log de erro
                        toast.error('Erro ao gravar fornecedor');
                    });
            } else {
                // Atualiza a lista de fornecedores no modo de edição
                props.setListaDeFornecedores(props.listaDeFornecedores.map((item) => {
                    if (item.codigo !== fornecedorSelecionado.codigo) {
                        return item;
                    }
                    return fornecedorSelecionado;
                }));

                props.setModoEdicao(false);
                props.setFornecedorSelecionado({
                    codigo: 0,
                    nome: '',
                    endereco: '',
                    contato: '',
                    cpf: ''
                });
                props.setExibirTabela(true);
            }
        } else {
            setFormValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }

    // Função para manipular as mudanças nos campos do formulário
    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setFornecedorSelecionado({ ...fornecedorSelecionado, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={fornecedorSelecionado.codigo}
                        onChange={manipularMudanca}
                        disabled={props.modoEdicao}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o código do fornecedor!</Form.Control.Feedback>
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
                        value={fornecedorSelecionado.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o Nome do fornecedor!</Form.Control.Feedback>
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
                        value={fornecedorSelecionado.endereco}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o Endereço do fornecedor!</Form.Control.Feedback>
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
                        value={fornecedorSelecionado.contato}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o Contato do fornecedor!</Form.Control.Feedback>
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
                        value={fornecedorSelecionado.cpf}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type='invalid'>Por favor, informe o CPF do fornecedor!</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">
                        {props.modoEdicao ? "Atualizar" : "Confirmar"}
                    </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
                </Col>
            </Row>
            <Toaster position="top-right" />
        </Form>
    );
}
