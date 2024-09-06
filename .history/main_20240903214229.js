
const elementos = {
    formulario: '[data-js="formulario"]',
}

const formulario = document.querySelector(elementos.formulario);
let listaDeItens = [];

function salvarDadosDoFormulario(evento) {

    evento.preventDefault();

    const itemDeCompra = formulario.item.value;
    
    const dados = {
        item: itemDeCompra,
    }

    listaDeItens.push(dados);

}

formulario.addEventListener('submit', pegarItemDaLista);
