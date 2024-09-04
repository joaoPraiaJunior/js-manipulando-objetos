
const elementos = {
    formulario: '[data-js="formulario"]',
}

const formulario = document.querySelector(elementos.formulario);
let listaDeItens = [];

function salvarDadosDoFormulario(evento) {

    evento.preventDefault();

    const itemDeCompra = formulario.item.value;
    verificaSeItemJaExiste(itemDeCompra);

    const dados = {
        item: itemDeCompra,
    }

    listaDeItens.push(dados);

    formulario.item.value = '';
}

function verificaSeItemJaExiste(item) {
    const itemJaExiste = listaDeItens.some((itemDaLista) => itemDaLista.item === item);

    if (itemJaExiste) {
        alert('Item já adicionado na lista');
    }

}

formulario.addEventListener('submit', salvarDadosDoFormulario);
