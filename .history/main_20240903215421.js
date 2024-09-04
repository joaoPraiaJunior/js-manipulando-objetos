
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

    // formulario.item.value = '';

    console.log(listaDeItens);
}

function verificaSeItemJaExiste(itemDeCompra) {

    const itemJaExiste = listaDeItens.some(item => item.item.toLowerCase() === itemDeCompra.toLowerCase());

    if (itemJaExiste) {
        alert('Este item já foi adicionado na lista');
        return;
    }
}

formulario.addEventListener('submit', salvarDadosDoFormulario);
