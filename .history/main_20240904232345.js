
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

    if (verificaSeItemJaExiste(itemDeCompra)) {
        alert('Item já existe na lista');
        return;
    }

    const dados = {
        valor: itemDeCompra,
        checar: false,
    }

    itensParaComprar.push(dados);

    formulario.item.value = '';

    renderizarItens();
}

function verificaSeItemJaExiste(itemDeCompra) {

    const itemJaExiste = itensParaComprar.some(item => item.valor.toLowerCase() === itemDeCompra.toLowerCase());

    return itemJaExiste;
}

function renderizarItens() {

    listaDeItens.innerHTML = '';

    itensParaComprar.forEach((item, indice) => {
        const itemCriado = criarItem(item, indice);
        listaDeItens.appendChild(itemCriado);
        itemNaListaComprado(itemCriado);
        deletarItem(itemCriado);
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
    divInputs.dataset.js = 'item';
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${indice}`;
    labelCheckBox.setAttribute('for', `checkbox-${indice}`);
    labelCheckBox.classList.add('checkbox');
    checkbox.classList.add('is-clickable');
    labelInput.setAttribute('for', `item-${indice}`);
    input.type = 'text';
    input.id = `item-${indice}`;
    input.classList.add('is-size-5', 'ml-2', 'eventos-ponteiro');
    input.value = item.valor;
    input.disabled = true;
    botaoDeletar.classList.add('button', 'is-ghost');
    botaoDeletar.dataset.js = 'deletar';
    IconeDeletar.classList.add('fa-solid', 'fa-trash', 'is-clickable');

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

function itemNaListaComprado(itemCriado) {

    const divInputs = itemCriado.querySelector('[data-js="item"]');

    divInputs.addEventListener('click', (evento) => {
        const checkbox = evento.currentTarget.querySelector('input[type="checkbox"]');
        const valorDoItem = evento.currentTarget.closest('[data-value]').getAttribute('data-value');
        const inputText = evento.currentTarget.querySelector('input[type="text"]');
        checkbox.checked = !checkbox.checked;
        itensParaComprar[valorDoItem].checar = checkbox.checked;

        if (itensParaComprar[valorDoItem].checar) {
            itensComprados.appendChild(itemCriado);
            inputText.classList.add('itens-comprados');
            return;
        }

        listaDeItens.appendChild(itemCriado);
        inputText.classList.remove('itens-comprados');

    });
}

function deletarItem(itemCriado) {
    const botaoDeletar = itemCriado.querySelector('.deletar');
}


formulario.addEventListener('submit', salvarDadosDoFormulario);
