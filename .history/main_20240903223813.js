
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

    renderizarItens();
}

function verificaSeItemJaExiste(itemDeCompra) {

    const itemJaExiste = itensParaComprar.some(item => item.valor.toLowerCase() === itemDeCompra.toLowerCase());

    return itemJaExiste;
}

function renderizarItens() {

    listaDeItens.innerHTML = '';

    itensParaComprar.forEach((item, indice) => {;
        listaDeItens.appendChild(criarItem(item, indice));
    });
}

function criarItem(item, indice) {

    const li = document.createElement('li');
    const divInputs = document.createElement('div');
    const labelCheckBox = document.createElement('label');
    const labelInput = document.createElement('label');
    const checkbox = document.createElement('input');
    const input = document.createElement('input');
    const divBotoes = document.createElement('div');
    const botaoDeletar = document.createElement('button');
    const IconeDeletar = document.createElement('i');

    li.classList.add('item-compra', 'is-flex', 'is-justify-content-space-between');
    li.dataset.value = indice;
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${indice}`;
    labelCheckBox.setAttribute('for', `checkbox-${indice}`);
    checkbox.classList.add('is-clickable');
    labelInput.setAttribute('for', `item-${indice}`);
    input.type = 'text';
    input.id = `item-${indice}`;
    input.classList.add('is-size-5');
    input.value = item.valor;
    input.disabled = true;

    labelCheckBox.appendChild(checkbox);
    labelInput.appendChild(input);
    divInputs.appendChild(labelCheckBox);
    divInputs.appendChild(labelInput);

    botaoDeletar.appendChild(IconeDeletar);
    divBotoes.appendChild(botaoDeletar);

    li.appendChild(divInputs);
    li.appendChild(divBotoes);

    return li;
}

formulario.addEventListener('submit', salvarDadosDoFormulario);
