const listaDeItens = {
    item1: 'Arroz',
    item2: 'Feijão',
    quantidade: 2,
    preco: 10.40,
    mostrarLista: function() {
        console.log(`Itens: ${this.item1} e ${this.item2}`);
    }
}

listaDeItens.mostrarLista(); // Itens: Arroz e Feijão