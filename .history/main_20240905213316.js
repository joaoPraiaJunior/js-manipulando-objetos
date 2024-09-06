
const elementos = {
    formulario: '[data-js="formulario"]',
    listaDeItens: '[data-js="lista-de-itens"]',
    itensComprados: '[data-js="itens-comprados"]',
    botaoDeletar: '[data-js="deletar"]',
    botaoEditar: '[data-js="editar"]',
    botaoSalvar: '[data-js="salvar"]',
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
        itemNaListaComprado(itemCriado);
        deletarItem(itemCriado);
        editarItem(itemCriado);
        salvarItemEditado(itemCriado)
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
    const botaoEditar = document.createElement('button');
    const botaoSalvar = document.createElement('button');
    const IconeSalvar = document.createElement('i');
    const IconeEditar = document.createElement('i');
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
    botaoEditar.classList.add('button', 'is-ghost');
    botaoEditar.dataset.js = 'editar';
    botaoSalvar.classList.add('button', 'is-ghost');
    botaoSalvar.dataset.js = 'salvar';
    IconeEditar.classList.add('fa-solid', 'fa-pen-to-square', 'is-clickable', 'editar');
    IconeSalvar.classList.add('fa-solid', 'fa-floppy-disk', 'is-clickable');

    labelCheckBox.appendChild(checkbox);
    labelInput.appendChild(input);
    divInputs.appendChild(labelCheckBox);
    divInputs.appendChild(labelInput);

    botaoDeletar.appendChild(IconeDeletar);
    botaoEditar.appendChild(IconeEditar);
    botaoSalvar.appendChild(IconeSalvar);
    divBotoes.appendChild(botaoSalvar);
    divBotoes.appendChild(botaoEditar);
    divBotoes.appendChild(botaoDeletar);

    li.appendChild(divInputs);
    li.appendChild(divBotoes);

    return li;
}

function manipularItemNaLista(evento, acao) {
    const valorDoItem = obterValorDoItem(evento);
    acao(valorDoItem);
    renderizarItens();
}

function obterValorDoItem(evento) {
    return evento.currentTarget.closest('[data-value]').getAttribute('data-value');
}

function itemNaListaComprado(itemCriado) {

    const divInputs = itemCriado.querySelector('[data-js="item"]');

    divInputs.addEventListener('click', (evento) => {
        manipularItemNaLista(evento, (valorDoItem) => {
            const checkbox = evento.currentTarget.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            itensParaComprar[valorDoItem].checar = checkbox.checked;
        });
    });
}

function deletarItem(itemCriado) {

    const botaoDeletar = itemCriado.querySelector(elementos.botaoDeletar);

    botaoDeletar.addEventListener('click', (evento) => {
        manipularItemNaLista(evento, (valorDoItem) => {
            itensParaComprar.splice(valorDoItem, 1);
        });
    });
}

function editarItem(itemCriado) {

    const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);
    const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);

    botaoEditar.addEventListener('click', (evento) => {
        const valorDoItem = obterValorDoItem(evento);
        const inputTexto = itemCriado.querySelector(`#item-${valorDoItem}`);
        inputTexto.disabled = false;
        botaoEditar.style.display = 'none';
        botaoSalvar.style.display = 'inline-block';
        inputTexto.focus();
    });
}

function salvarItemEditado(itemCriado) {

    const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);
    const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

    botaoSalvar.addEventListener('click', (evento) => {
        const valorDoItem = obterValorDoItem(evento);
        const inputTexto = itemCriado.querySelector(`#item-${valorDoItem}`);
        itensParaComprar[valorDoItem].valor = inputTexto.value;
        inputTexto.disabled = true;
        botaoEditar.style.display = 'inline-block';
        botaoSalvar.style.display = 'none';
        console.log(itensParaComprar);
    });
}

function selecionaListaParaItem(valorDoItem, itemCriado) {

    const checkbox = itemCriado.querySelector('input[type="checkbox"]');
    const inputText = itemCriado.querySelector('input[type="text"]');
    const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);
    const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

    if (itensParaComprar[valorDoItem].checar) {
        itensComprados.appendChild(itemCriado);
        inputText.classList.add('itens-comprados');
        botaoEditar.style.display = 'none';
        botaoSalvar.style.display = 'none';
        checkbox.checked = true;
        return;
    }

    listaDeItens.appendChild(itemCriado);
    inputText.classList.remove('itens-comprados');
    botaoEditar.style.display = 'inline-block';
    botaoSalvar.style.display = 'inline-block';
}


formulario.addEventListener('submit', salvarDadosDoFormulario);
