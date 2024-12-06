const urlBase = 'https://bcc-backend-lp-2-pi.vercel.app/fornecedores';

export async function gravarFornecedor(fornecedor){
    try {
        console.log('Enviando dados para a API:', fornecedor);  // Verifique os dados que estão sendo enviados

        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(fornecedor)
        });

        console.log('Código de status da resposta:', resposta.status);  // Verifique o status HTTP

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status} - ${resposta.statusText}`);
        }

        const resultado = await resposta.json();
        console.log('Resposta da API:', resultado);  // Verifique a resposta da API

        return resultado;
    } catch (erro) {
        console.error('Erro ao gravar fornecedor:', erro);
        return { status: false, mensagem: erro.message };
    }
}

export async function alterarFornecedor(fornecedor){
    const resposta = await fetch(urlBase,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(fornecedor)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirFornecedor(fornecedor){
    const resposta = await fetch(urlBase + "/" + fornecedor.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarFornecedor() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}