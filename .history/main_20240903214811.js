
const elementos = {
    formulario: '[data-js="formulario"]',
}

const formulario = document.querySelector(elementos.formulario);
let listaDeItens = [];

function salvarDadosDoFormulario(evento) {

    evento.preventDefault();

    const itemDeCompra = formulario.item.value;
    const itemJaExiste = listaDeItens.some(item => item.item === itemDeCompra);


    if (itemJaExiste) {
        alert('Este item já foi adicionado na lista');
        return;
    }

    const dados = {
        item: itemDeCompra,
    }

    listaDeItens.push(dados);

    formulario.item.value = '';

}

formulario.addEventListener('submit', salvarDadosDoFormulario);
