// src/directives/amazon-affiliate.js
// remova as virgulas do final das linhas 19 e 20

export default {
  // Diretiva personalizada do Vue
  install (app) {
    app.directive('amazon-affiliate', {
      // Chamado quando a diretiva é montada no elemento
      mounted (el, binding) {
        // Valor passado para a diretiva - mapeamento de palavras-chave para ASINs
        const keywordToAsin = binding.value || {}

        // Tag de afiliado passado como argumento da diretiva
        const affiliateTag = binding.arg || 'seu-tag-afiliado'

        // Conteúdo original do elemento
        const originalContent = el.innerHTML

        // Processar cada palavra-chave no mapeamento
        let processedContent = originalContent
        Object.entries(keywordToAsin).forEach(([keyword, asin]) => {
          // Regex para encontrar a palavra-chave, excluindo ocorrências dentro de tags HTML
          const regex = new RegExp(`(?<!<[^>]*)(\\b${keyword}\\b)(?![^<]*>)`, 'gi')

          // Gerar link de afiliado da Amazon
          const amazonUrl = `https://www.amazon.com.br/dp/${asin}?tag=${affiliateTag}`

          // Substituir todas as ocorrências
          processedContent = processedContent.replace(
            regex,
            `<a href="${amazonUrl}" target="_blank" rel="noopener" class="amazon-affiliate-link">${keyword}</a>`
          )
        })

        // Atualizar o HTML do elemento
        el.innerHTML = processedContent
      }
    })
  }
}
