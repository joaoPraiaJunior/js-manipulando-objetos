
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
        valor: itemDeCompra,
    }

    itensParaComprar.push(dados);

    formulario.item.value = '';

    console.log(itensParaComprar);
}

function verificaSeItemJaExiste(itemDeCompra) {

    const itemJaExiste = itensParaComprar.some(item => item.item.toLowerCase() === itemDeCompra.toLowerCase());

    return itemJaExiste;
}

function renderizarItens() {

    listaDeItens.innerHTML = '';

    itensParaComprar.forEach((item, indice) => {
        criarItem(item, indice);
        listaDeItens.appendChild(li);
    });
}   

function criarItem(item, indice) {

    const li = document.createElement('li');
    const divInputs = document.createElement('div');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const input = document.createElement('input');
    const divBotoes = document.createElement('div');
    const botaoDeletar = document.createElement('button');
    const IconeDeletar = document.createElement('i');

    li.classList.add('item-compra', 'is-flex', 'is-justify-content-space-between');
    li.dataset.value = indice;
    checkbox.type = 'checkbox';
    checkbox.classList.add('is-clickable');
    input.type = 'text';
    input.classList.add('is-size-5');
    input.value = item.valor;
    input.disabled = true;


    label.appendChild(checkbox);
    label.appendChild(input);
    divInputs.appendChild(label);

    botaoDeletar.appendChild(IconeDeletar);
    divBotoes.appendChild(botaoDeletar);

    li.appendChild(divInputs);
    li.appendChild(divBotoes);

    return li;
}

formulario.addEventListener('submit', salvarDadosDoFormulario);
