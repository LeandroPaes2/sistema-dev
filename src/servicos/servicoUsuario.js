const urlBase = 'https://bcc-backend-lp-2-pi.vercel.app/Usuarios';

export async function gravarUsuario(usuario){
    const resposta = await fetch(urlBase,{
        'method':"POST",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function alterarUsuario(usuario){
    const resposta = await fetch(urlBase,{
        'method':"PUT",
        'headers': { 
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function excluirUsuario(usuario){
    const resposta = await fetch(urlBase + "/" + usuario.codigo,{
        'method':"DELETE",
    });
    const resultado = await resposta.json();
    return resultado;
}

export async function consultarUsuario() {
    const resposta = await fetch(urlBase,{
        'method':"GET"
    });
    const resultado = await resposta.json();
    return resultado;
}