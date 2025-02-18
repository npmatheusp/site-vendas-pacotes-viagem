document.getElementById('quantidade').addEventListener('input', function() {
    // Obtendo a quantidade digitada
    const quantidade = parseInt(this.value);

    // Verifique se a quantidade é um número válido e maior que 0
    if (isNaN(quantidade) || quantidade <= 0) {
        document.getElementById('valorTotal').textContent = "Valor Total: R$ 0.00";
        return;
    }

    // Pegue o preço diretamente do HTML
    const precoTexto = document.getElementById('preco').textContent;  // Exemplo: "Preço: R$ 5000"
    
    // Remover a parte "Preço: R$" e converter para número
    const preco = parseFloat(precoTexto.replace('Preço: R$', '').replace(',', '.').trim());

    // Verifique se o preço é um número válido
    if (isNaN(preco)) {
        document.getElementById('valorTotal').textContent = "Valor Total: R$ 0.00";
        return;
    }

    // Cálculo do valor total
    const valorTotal = preco * quantidade;

    // Exibir o valor total com 2 casas decimais
    document.getElementById('valorTotal').textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
});

