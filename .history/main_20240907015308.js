(function () {

    'use strict';

    const elementos = {
        formulario: '[data-js="formulario"]',
        listaDeItens: '[data-js="lista-de-itens"]',
        itensComprados: '[data-js="itens-comprados"]',
        botaoDeletar: '[data-js="deletar"]',
        botaoEditar: '[data-js="editar"]',
        botaoSalvar: '[data-js="salvar"]',
        valorDoDado: '[data-value]',
        checkbox: '[data-js="checkbox"]',
        textoDoItem: '[data-js="texto"]',
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
            console.error('Erro ao carregar itens do localStorage:', error);
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


    function limparListas() {
        listaDeItens.innerHTML = '';
        itensComprados.innerHTML = '';
    }

    function renderizarItens() {

        armazenarItemNoLocalStorage();
        limparListas();

        itensParaComprar.forEach(criarEAdicionarItem);
    }


    function criarEAdicionarItem(item, indice) {
        
        const itemCriado = criarItem(item, indice);
        const valorDoItem = itemCriado.getAttribute('data-value');
        selecionaListaParaItem(valorDoItem, itemCriado)
        adicionarEventosAoItem(itemCriado);
    }


    function adicionarEventosAoItem(itemCriado) {

        const eventos = [itemNaListaComprado, deletarItem, editarItem, salvarItemEditado, salvarItensPeloTeclado];
        eventos.forEach(evento => evento(itemCriado));
    }

    function criarItem(item, indice) {

        const li = document.createElement('li');
        const divInputs = document.createElement('div');
        const labelCheckBox = document.createElement('label');
        const checkbox = document.createElement('input');
        const textoDoItem = document.createElement('span');
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
        textoDoItem.classList.add('is-size-5', 'ml-2', 'is-inline-block');
        textoDoItem.textContent = item.valor;
        textoDoItem.contentEditable = false;
        textoDoItem.dataset.js = 'texto';
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
        labelCheckBox.appendChild(textoDoItem);
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

    function obterValorDoItem(evento) {
        return evento.currentTarget.closest('li').dataset.value;
    }

    function itemNaListaComprado(itemCriado) {

        const checkboxItem = itemCriado.querySelector(elementos.checkbox);

        checkboxItem.addEventListener('change', (evento) => {
            const valorDoItem = obterValorDoItem(evento);
            itensParaComprar[valorDoItem].checar = checkboxItem.checked;
            renderizarItens();
        });
    }

    function deletarItem(itemCriado) {

        const botaoDeletar = itemCriado.querySelector(elementos.botaoDeletar);

        botaoDeletar.addEventListener('click', (evento) => {
            const valorDoItem = obterValorDoItem(evento);
            itensParaComprar.splice(valorDoItem, 1);
            armazenarItemNoLocalStorage();
            removerItemDoDOM(itemCriado, valorDoItem)
        });
    }

    function removerItemDoDOM(itemCriado, valorDoItem) {

        const item = itemCriado.dataset.value === valorDoItem;

        if (item) {
            itemCriado.remove();
            return;
        }

    }

    function editarItem(itemCriado) {

        const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

        botaoEditar.addEventListener('click', () => {
            manipularBotoesEditarSalvar(itemCriado, true);
            alternarModoDeEdicao(itemCriado, true);
        });
    }

    function salvarItemEditado(itemCriado) {

        const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);

        botaoSalvar.addEventListener('click', (evento) => {
            atualizarItemDaLista(itemCriado, evento);
            manipularBotoesEditarSalvar(itemCriado, false);
            alternarModoDeEdicao(itemCriado, false);
        });
    }

    function salvarItensPeloTeclado(itemCriado) {

        const textoDoItem = itemCriado.querySelector(elementos.textoDoItem);

        textoDoItem.addEventListener('keydown', (evento) => {

            const tecla = evento.key;

            if (tecla === 'Enter') {
                evento.preventDefault();
                atualizarItemDaLista(itemCriado, evento);
                manipularBotoesEditarSalvar(itemCriado, false);
                alternarModoDeEdicao(itemCriado, false)

            } else if (tecla === 'Escape') {
                manipularBotoesEditarSalvar(itemCriado, false);
                alternarModoDeEdicao(itemCriado, false)
            }
        });

    }

    function atualizarItemDaLista(itemCriado, evento) {
        const valorDoItem = obterValorDoItem(evento);
        const textoDoItem = itemCriado.querySelector(elementos.textoDoItem);
        itensParaComprar[valorDoItem].valor = textoDoItem.textContent;
        armazenarItemNoLocalStorage();
    }

    function manipularBotoesEditarSalvar(itemCriado, editar) {
        const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);
        const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

        botaoEditar.classList.toggle('esconder', editar);
        botaoSalvar.classList.toggle('esconder', !editar);
    }

    function alternarModoDeEdicao(itemCriado, editar) {

        const textoDoItem = itemCriado.querySelector(elementos.textoDoItem);

        textoDoItem.contentEditable = editar;
        textoDoItem.classList.toggle('editando', editar);

        if (editar) {
            textoDoItem.focus();
            textoDoItem.setAttribute('tabindex', '0');
            return;
        }

        textoDoItem.blur();
        textoDoItem.removeAttribute('tabindex');
    }

    function selecionaListaParaItem(valorDoItem, itemCriado) {

        const checkbox = itemCriado.querySelector(elementos.checkbox);
        const textoDoItem = itemCriado.querySelector(elementos.textoDoItem);
        const botaoSalvar = itemCriado.querySelector(elementos.botaoSalvar);
        const botaoEditar = itemCriado.querySelector(elementos.botaoEditar);

        const estaComprado = itensParaComprar[valorDoItem].checar;
        moverItemParaLista(itemCriado, estaComprado);

        textoDoItem.classList.toggle('itens-comprados', estaComprado);
        botaoEditar.classList.toggle('esconder', estaComprado);
        botaoSalvar.classList.add('esconder');
        checkbox.checked = estaComprado;
    }

    function moverItemParaLista(itemCriado, estaComprado) {

        const listaDeDestino = estaComprado ? itensComprados : listaDeItens;
        listaDeDestino.appendChild(itemCriado);
    }

    function armazenarItemNoLocalStorage() {
        localStorage.setItem('itens', JSON.stringify(itensParaComprar));
    }

    formulario.addEventListener('submit', salvarDadosDoFormulario);
    document.addEventListener('DOMContentLoaded', renderizarItens);

    // (valores omitidos, 0, null, NaN, undefined, "", false) << retornam false no JS

})();