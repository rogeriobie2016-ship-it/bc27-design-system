(function () {
  var USO = {
    abertura: { usar: 'Começo de vídeo, live, transmissão ou bloco do evento.', nao: 'No meio de uma fala ou depois do conteúdo principal.' },
    'transição': { usar: 'Entre blocos, painéis ou na troca de assunto.', nao: 'Como abertura principal ou por cima de fala ao vivo.' },
    encerramento: { usar: 'Fim de vídeo, live ou do dia de evento.', nao: 'Antes do conteúdo principal ou no meio do vídeo.' }
  };
  var K = 'BRAZIL CONFERENCE 2027';
  var L = [
    ['abertura-primeira-pessoa', 'O Brasil em primeira pessoa', '16:9', 'abertura', { elemento: 'concreta', paleta: 'verde', estrutura: 'faixa', entrada: 'letras', titulo: 'O Brasil em/primeira/pessoa' }],
    ['abertura-nossas-cidades', 'Nossas cidades', '9:16', 'abertura', { elemento: 'monumentos', paleta: 'papel', estrutura: 'selo', entrada: 'queda', titulo: 'NOSSAS/CIDADES' }],
    ['abertura-brasilia', 'Brasília', '16:9', 'abertura', { elemento: 'athos', paleta: 'azul', estrutura: 'selo', entrada: 'escala', titulo: 'BRASÍLIA' }],
    ['abertura-carnaval', 'É carnaval na BC27', '9:16', 'abertura', { elemento: 'confete', paleta: 'vivo', estrutura: 'faixa', entrada: 'queda', titulo: 'É CARNAVAL/NA BC27' }],
    ['abertura-arraia', 'Arraiá BC27', '1:1', 'abertura', { elemento: 'bandeirinhas', paleta: 'noite', estrutura: 'contorno', entrada: 'queda', titulo: 'ARRAIÁ/BC27' }],
    ['transicao-painel-do-dia', 'Painel do dia', '16:9', 'transição', { elemento: 'listras', paleta: 'amarelo', estrutura: 'faixa', entrada: 'linhas', titulo: 'PAINEL/DO DIA' }],
    ['transicao-destaque', 'Destaque', '1:1', 'transição', { elemento: 'asteriscos', paleta: 'noite', estrutura: 'contorno', entrada: 'letras', titulo: 'DESTAQUE' }],
    ['transicao-cordel', 'Cordel da BC27', '9:16', 'transição', { elemento: 'cordel', paleta: 'papel', estrutura: 'faixa', entrada: 'letras', titulo: 'CORDEL/DA BC27', larguraFonte: 75 }],
    ['transicao-ideias', 'Ideias em construção', '16:9', 'transição', { elemento: 'concreta', paleta: 'noite', estrutura: 'nada', entrada: 'linhas', titulo: 'Ideias/em/construção', alinhamento: 'esquerda', peso: 600, caixa: 'como digitado' }],
    ['encerramento-homenagem', 'Homenagem', '16:9', 'encerramento', { elemento: 'floreio', paleta: 'branco', estrutura: 'faixa', entrada: 'desfoque', titulo: 'HOMENAGEM' }],
    ['encerramento-viva', 'Viva!', '1:1', 'encerramento', { elemento: 'confete', paleta: 'branco', estrutura: 'selo', entrada: 'escala', titulo: 'VIVA!' }],
    ['encerramento-obrigado', 'Obrigado', '9:16', 'encerramento', { elemento: 'ondas', paleta: 'ceu', estrutura: 'faixa', entrada: 'desfoque', titulo: 'OBRIGADO!' }]
  ];
  var RES = { '9:16': [1080, 1920], '16:9': [1920, 1080], '1:1': [1080, 1080] };
  window.BC_VINHETAS = L.map(function (v) {
    var r = RES[v[2]];
    var props = Object.assign({ kicker: K }, v[4], { formato: v[2] });
    return { slug: v[0], nome: v[1], formato: v[2], uso: v[3], duracao: 8, w: r[0], h: r[1], props: props, usar: USO[v[3]].usar, nao: USO[v[3]].nao,
      arquivo: 'bc27-vinheta-' + v[0] + '-' + v[2].replace(':', 'x') + '.mp4', capa: 'assets/img/vinhetas/' + v[0] + '.jpg' };
  });
})();
