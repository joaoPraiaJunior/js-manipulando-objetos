
const elementos = {
    formulario: '[data-js="formulario"]',
    listaDeItens: '[data-js="lista-de-itens"]',
    itensComprados: '[data-js="itens-comprados"]',
}

const formulario = document.querySelector(elementos.formulario);
const listaDeItens = document.querySelector(elementos.listaDeItens);
const itensComprados = document.querySelector(elementos.itensComprados);
let itensParaComprar = [];

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

    itensParaComprar.push(dados);

    formulario.item.value = '';

    console.log(itensParaComprar);
}

function verificaSeItemJaExiste(itemDeCompra) {

    const itemJaExiste = itensParaComprar.some(item => item.item.toLowerCase() === itemDeCompra.toLowerCase());

    return itemJaExiste;
}

formulario.addEventListener('submit', salvarDadosDoFormulario);
