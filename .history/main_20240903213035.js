const listaDeItens = [];



const listaDeCompras = {
    compra1: "Arroz",
    compra2: "Feijão",
    compra3: "Biscoito"
}

delete listaDeCompras.compra2    // Deleta a chave compra2 do objeto listaDeCompras

console.log(listaDeCompras) // { compra1: 'Arroz', compra3: 'Biscoito' }