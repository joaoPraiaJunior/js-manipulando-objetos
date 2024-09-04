
const elementos = {
    formulario: '[data-js="formulario"]',
}

const formulario = document.querySelector(elementos.formulario);
let listaDeItens = [];

function salvarDadosDoFormulario(evento) {

    evento.preventDefault();

    const itemDeCompra = formulario.item.value;

    if(verificaSeItemJaExiste(itemDeCompra)) {
        
        alert('Item já existe na lista');
        return;
    }

    const dados = {
        item: itemDeCompra,
    }

    listaDeItens.push(dados);

    formulario.item.value = '';

    console.log(listaDeItens);
}

function verificaSeItemJaExiste(itemDeCompra) {

    const itemJaExiste = listaDeItens.some(item => item.item.toLowerCase() === itemDeCompra.toLowerCase());

    return itemJaExiste;
}

formulario.addEventListener('submit', salvarDadosDoFormulario);
