import { Button, Spinner, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { consultarCategoria } from '../../../servicos/servicoCategoria';
import { gravarProduto } from '../../../servicos/servicoProduto';

import toast, {Toaster} from 'react-hot-toast';

export default function FormCadProdutos(props) {
    const [produtoSelecionado, setProdutoSelecionado] = useState(props.produtoSelecionado);
    const [formValidado, setFormValidado] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [temCategorias, setTemCategorias] = useState(false);

    useEffect(()=>{
        consultarCategoria().then((resultado)=>{
            if (Array.isArray(resultado)){
                setCategorias(resultado);
                setTemCategorias(true);
            }
            else{
                toast.error("Não foi possível carregar as categorias");
            }
        }).catch((erro)=>{
            setTemCategorias(false);
            toast.error("Não foi possível carregar as categorias");
        });
        
    },[]); //didMount

    function selecionarCategoria(evento){
        setProdutoSelecionado({...produtoSelecionado, 
                       categoria:{
                        codigo: evento.currentTarget.value

                       }});
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {

            if (!props.modoEdicao) {
                //cadastrar o produto
                gravarProduto(produtoSelecionado)
                .then((resultado)=>{
                    if (resultado.status){
                        //exibir tabela com o produto incluído
                        props.setExibirTabela(true);
                    }
                    else{
                        toast.error(resultado.mensagem);
                    }
                });
            }
            else {
                //editar o produto
                /*altera a ordem dos registros
                props.setListaDeProdutos([...props.listaDeProdutos.filter(
                    (item) => {
                        return item.codigo !== produto.codigo;
                    }
                ), produto]);*/

                //não altera a ordem dos registros
                props.setListaDeProdutos(props.listaDeProdutos.map((item) => {
                    if (item.codigo !== produtoSelecionado.codigo)
                        return item
                    else
                        return produtoSelecionado
                }));

                //voltar para o modo de inclusão
                props.setModoEdicao(false);
                props.setProdutoSelecionado({
                    codigo: 0,
                    descricao: "",
                    precoCusto: 0,
                    precoVenda: 0,
                    qtdEstoque: 0,
                    urlImagem: "",
                    dataValidade: "",
                    categoria: {}
                });
                props.setExibirTabela(true);
            }

        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setProdutoSelecionado({ ...produtoSelecionado, [elemento]: valor });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
    <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="codigo">
            <Form.Label>Código</Form.Label>
            <Form.Control
                required
                type="text"
                name="codigo"
                value={produtoSelecionado.codigo}
                disabled={props.modoEdicao}
                onChange={manipularMudanca}
            />
            <Form.Control.Feedback type='invalid'>Por favor, informe o código do produto!</Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row className="mb-4">
        <Form.Group as={Col} md="12" controlId="descricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
                required
                type="text"
                name="descricao"
                value={produtoSelecionado.descricao}
                onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">Por favor, informe a descrição do produto!</Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="precoCusto">
            <Form.Label>Preço de Custo:</Form.Label>
            <InputGroup hasValidation>
                <InputGroup.Text>R$</InputGroup.Text>
                <Form.Control
                    type="text"
                    name="precoCusto"
                    value={produtoSelecionado.precoCusto}
                    onChange={manipularMudanca}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o preço de custo!
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="precoVenda">
            <Form.Label>Preço de Venda:</Form.Label>
            <InputGroup hasValidation>
                <InputGroup.Text>R$</InputGroup.Text>
                <Form.Control
                    type="text"
                    name="precoVenda"
                    value={produtoSelecionado.precoVenda}
                    onChange={manipularMudanca}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe o preço de venda!
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="qtdEstoque">
            <Form.Label>Qtd em estoque:</Form.Label>
            <InputGroup hasValidation>
                <InputGroup.Text>+</InputGroup.Text>
                <Form.Control
                    type="text"
                    name="qtdEstoque"
                    value={produtoSelecionado.qtdEstoque}
                    onChange={manipularMudanca}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe a quantidade em estoque!
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    </Row>
    <Row className="mb-4">
        <Form.Group as={Col} md="12" controlId="urlImagem">
            <Form.Label>Url da imagem:</Form.Label>
            <Form.Control
                required
                type="text"
                name="urlImagem"
                value={produtoSelecionado.urlImagem}
                onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">Por favor, informe a url da imagem do produto!</Form.Control.Feedback>
        </Form.Group>
    </Row>
    <Row className="mb-4">
        <Form.Group as={Col} md="4" controlId="dataValidade">
            <Form.Label>Válido até:</Form.Label>
            <Form.Control
                required
                type="date"
                name="dataValidade"
                value={produtoSelecionado.dataValidade}
                onChange={manipularMudanca}
            />
            <Form.Control.Feedback type="invalid">Por favor, informe a data de validade do produto!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md={7} controlId="categoria">
            <Form.Label>Categoria:</Form.Label>
            <Form.Select 
                name='categoria'
                onChange={selecionarCategoria}>
                {// criar em tempo de execução as categorias existentes no banco de dados
                    categorias.map((categoria) => (
                        <option key={categoria.codigo} value={categoria.codigo}>
                            {categoria.descricao}
                        </option>
                    ))
                }
            </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={1}>
            {!temCategorias && <Spinner className='mt-4' animation="border" variant="success" />}
        </Form.Group>
    </Row>
    <Row className='mt-2 mb-2'>
        <Col md={1}>
            <Button type="submit" disabled={!temCategorias}>{props.modoEdicao ? "Alterar" : "Confirmar"}</Button>
        </Col>
        <Col md={{ offset: 1 }}>
            <Button onClick={() => props.setExibirTabela(true)}>Voltar</Button>
        </Col>
    </Row>
    <Toaster position="top-right" />
</Form>

        
    );
}