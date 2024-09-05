
const elementos = {
    formulario: '[data-js="formulario"]',
    listaDeItens: '[data-js="lista-de-itens"]',
    itensComprados: '[data-js="itens-comprados"]',
    botaoDeletar: '[data-js="deletar"]',
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
    itensComprados.innerHTML = '';

    itensParaComprar.forEach((item, indice) => {
        const itemCriado = criarItem(item, indice);
        const valorDoItem = itemCriado.getAttribute('data-value');
        selecionaListaParaItem(valorDoItem, itemCriado)
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
    checkbox.classList.add('eventos-ponteiro');
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

    itemNaListaComprado(li);
    deletarItem(li);

    return li;
}

function itemNaListaComprado(itemCriado) {

    const divInputs = itemCriado.querySelector('[data-js="item"]');

    divInputs.addEventListener('click', (evento) => {
        console.log(evento.currentTarget);
        const checkbox = evento.currentTarget.querySelector('input[type="checkbox"]');
        const valorDoItem = evento.currentTarget.closest('[data-value]').getAttribute('data-value');

        selecionaListaParaItem(valorDoItem, itemCriado);

    });
}

function deletarItem(itemCriado) {

    const botaoDeletar = itemCriado.querySelector(elementos.botaoDeletar);

    botaoDeletar.addEventListener('click', (evento) => {
        const valorDoItem = evento.target.closest('[data-value]').getAttribute('data-value');
        itensParaComprar.splice(valorDoItem, 1);
        renderizarItens();
        console.log(itensParaComprar);
    });
}

function selecionaListaParaItem(valorDoItem, itemCriado) {

    const checkbox = itemCriado.querySelector('input[type="checkbox"]');
    const inputText = itemCriado.querySelector('input[type="text"]');

    if (itensParaComprar[valorDoItem].checar) {
        itensComprados.appendChild(itemCriado);
        inputText.classList.add('itens-comprados');
        checkbox.checked = true;
        itensParaComprar[valorDoItem].checar = !checkbox.checked;
        return;
    }

    listaDeItens.appendChild(itemCriado);
    inputText.classList.remove('itens-comprados');
    checkbox.checked = false;
    itensParaComprar[valorDoItem].checar = !checkbox.checked;
}


formulario.addEventListener('submit', salvarDadosDoFormulario);
