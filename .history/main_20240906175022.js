
const elementos = {
    formulario: '[data-js="formulario"]',
    listaDeItens: '[data-js="lista-de-itens"]',
    itensComprados: '[data-js="itens-comprados"]',
    botaoDeletar: '[data-js="deletar"]',
    botaoEditar: '[data-js="editar"]',
    botaoSalvar: '[data-js="salvar"]',
    valorDoDado: '[data-value]',
    checkbox: '[data-js="checkbox"]',
    spanTexto: '[data-js="texto"]',
}

const formulario = document.querySelector(elementos.formulario);
const listaDeItens = document.querySelector(elementos.listaDeItens);
const itensComprados = document.querySelector(elementos.itensComprados);
let itensParaComprar = carregarItensDoLocalStorage();

function carregarItensDoLocalStorage() {

    try {

        const itens = JSON.parse(localStorage.getItem('itens'));
        return Array.isArray(itens) ? itens : [];

    } catch (error) {
        return [];
    }
}

function salvarDadosDoFormulario(evento) {

    evento.preventDefault();

    const itemDeCompra = formulario.item.value.trim();

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

    armazenarNoLocalStorage();

    listaDeItens.innerHTML = '';
    itensComprados.innerHTML = '';

    itensParaComprar.forEach((item, indice) => {
        const itemCriado = criarItem(item, indice);
        const valorDoItem = itemCriado.getAttribute('data-value');
        selecionaListaParaItem(valorDoItem, itemCriado)
        itemNaListaComprado(itemCriado);
        deletarItem(itemCriado);
        editarItem(itemCriado);
        salvarItemEditado(itemCriado);
        salvarItensPeloTeclado(itemCriado);
    });
}

function criarItem(item, indice) {

    const li = document.createElement('li');
    const divInputs = document.createElement('div');
    const labelCheckBox = document.createElement('label');
    const checkbox = document.createElement('input');
    const spanTexto = document.createElement('span');
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
    checkbox.dataset.js = 'checkbox';
    labelCheckBox.setAttribute('for', `checkbox-${indice}`);
    labelCheckBox.classList.add('checkbox');
    checkbox.classList.add('eventos-ponteiro');
    spanTexto.classList.add('is-size-5', 'ml-2', 'is-inline-block');
    spanTexto.textContent = item.valor;
    spanTexto.contentEditable = false;
    spanTexto.dataset.js = 'texto';
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
    labelCheckBox.appendChild(spanTexto);
    divInputs.appendChild(labelCheckBox);

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
    return evento.currentTarget.closest(elementos.valorDoDado).dataset.value;
}

function itemNaListaComprado(itemCriado) {

    const checkboxItem = itemCriado.querySelector(elementos.checkbox);

    checkboxItem.addEventListener('change', (evento) => {
        manipularItemNaLista(evento, (valorDoItem) => {
            itensParaComprar[valorDoItem].checar = checkboxItem.checked;
        });
    });
}

function deletarItem(itemCriado) {

    const botaoDeletar = itemCriado.querySelector(elementos.botaoDeletar);

    botaoDeletar.addEventListener('click', (evento) => {
        manipularItemNaLista(evento, (valorDoItem) => {
            itensParaComprar.splice(valorDoItem, 1);
            renderizarItens();
        });
    });
}

function editarItem(itemCriado) {

    const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

    botaoEditar.addEventListener('click', () => {
        manipularBotoesEditarSalvar(itemCriado, true);
    });
}

function salvarItemEditado(itemCriado) {

    const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);

    botaoSalvar.addEventListener('click', (evento) => {
        atualizarItemDaLista(itemCriado, evento);
        manipularBotoesEditarSalvar(itemCriado, false);
    });
}

function salvarItensPeloTeclado(itemCriado) {

    const spanTexto = itemCriado.querySelector(elementos.spanTexto);

    spanTexto.addEventListener('keydown', (evento) => {
        const tecla = evento.key;
        if (tecla === 'Enter') {
            evento.preventDefault();
            atualizarItemDaLista(itemCriado, evento);
            manipularBotoesEditarSalvar(itemCriado, false);
        }
    });

}

function atualizarItemDaLista(itemCriado, evento) {
    const valorDoItem = obterValorDoItem(evento);
    const spanTexto = itemCriado.querySelector(elementos.spanTexto);
    itensParaComprar[valorDoItem].valor = spanTexto.textContent;
    armazenarNoLocalStorage();
}

function manipularBotoesEditarSalvar(itemCriado, editar) {

    const spanTexto = itemCriado.querySelector(elementos.spanTexto);
    const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);
    const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

    if (editar) {
        botaoSalvar.classList.add('ocultar');
        botaoEditar.classList.add('mostrar');
        spanTexto.contentEditable = true;
        spanTexto.setAttribute('tabindex', '0');
        spanTexto.focus();
        return;
    }

    botaoSalvar.style.display = 'none';
    botaoEditar.style.display = 'inline-block';
    spanTexto.contentEditable = false;
    spanTexto.removeAttribute('tabindex');
}

function selecionaListaParaItem(valorDoItem, itemCriado) {

    const checkbox = itemCriado.querySelector(elementos.checkbox);
    const spanTexto = itemCriado.querySelector(elementos.spanTexto);
    const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);
    const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

    if (itensParaComprar[valorDoItem].checar) {
        itensComprados.appendChild(itemCriado);
        spanTexto.classList.add('itens-comprados');
        botaoEditar.style.display = 'none';
        botaoSalvar.style.display = 'none';
        checkbox.checked = true;
        return;
    }

    listaDeItens.appendChild(itemCriado);
    spanTexto.classList.remove('itens-comprados');
    botaoEditar.style.display = 'inline-block';
    botaoSalvar.style.display = 'none';
}

function armazenarNoLocalStorage() {
    localStorage.setItem('itens', JSON.stringify(itensParaComprar));
}

formulario.addEventListener('submit', salvarDadosDoFormulario);
document.addEventListener('DOMContentLoaded', renderizarItens);
