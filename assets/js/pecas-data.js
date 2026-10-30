(function () {
  // id, nome, componente, grupo, descrição
  var P = [
    ['post', 'Posts e stories', 'post', 'Redes', 'Feed 4:5, quadrado e story com layouts do sistema.'],
    ['palestrante', 'Palestrantes', 'palestrante', 'Redes', 'Anúncio de quem vai falar, com foto e moldura.'],
    ['sponsor', 'Sponsors', 'sponsor', 'Redes', 'Agradecimento e anúncio de patrocinadores por cota.'],
    ['redes', 'LinkedIn e redes', 'redes', 'Redes', 'Capas, banners e enxoval das redes sociais.'],
    ['destaque', 'Destaques do Instagram', 'destaque', 'Redes', 'Capas dos destaques com ícones da BC27.'],
    ['time', 'Time BC27', 'time', 'Redes', 'Kit de stories e posts para quem faz parte do time.'],
    ['slide', 'Slides', 'slide', 'Evento', 'Capa, divisor, conteúdo, citação, agenda e mais.'],
    ['gc', 'GCs', 'gc', 'Evento', 'Nome e cargo na tela para vídeos e transmissões.'],
    ['sting', 'Stings', 'sting', 'Evento', 'Transições curtas de 3 s entre blocos.'],
    ['logo', 'Logo animada', 'logo', 'Evento', 'Assinatura em movimento para abrir e fechar vídeos.'],
    ['adesivo', 'Adesivos', 'adesivo', 'Impressos', 'Estrelas, selos, fitas, carimbos e ilustrações.'],
    ['merch', 'Merch', 'merch', 'Impressos', 'Crachá, ecobag, caderno, camiseta e backdrop.'],
    ['padrao', 'Padrões em peça', 'padrao', 'Impressos', 'Padrões aplicados em formatos prontos.']
  ];
  var T = function (id, c, p) { return { id: id, c: c, p: p || {}, src: 'assets/img/pecas/' + id + '.jpg' }; };
  window.BC_PECAS = P.map(function (x) { return { id: x[0], nome: x[1], c: x[2], grupo: x[3], desc: x[4], capa: 'assets/img/pecas/' + x[0] + '.jpg' }; });
  window.BC_THUMBS = [
    T('post', 'post'), T('palestrante', 'palestrante'), T('sponsor', 'sponsor'), T('redes', 'redes'), T('destaque', 'destaque'), T('time', 'time'), T('slide', 'slide'),
    T('gc', 'gc'), T('sting', 'sting', { pausar: true, tempo: 1.5 }), T('logo', 'logo'), T('adesivo', 'adesivo'), T('merch', 'merch'), T('padrao', 'padrao'),
    T('merch-ecobag', 'merch', { tipo: 'ecobag', estampa: 'tema' }), T('merch-caderno', 'merch', { tipo: 'caderno', corPeca: 'noite', paleta: 'noite', elemento: 'fuxico' }), T('merch-camiseta', 'merch', { tipo: 'camiseta', corPeca: 'verde' }), T('merch-backdrop', 'merch', { tipo: 'backdrop' }), T('merch-cracha-palestrante', 'merch', { tipo: 'cracha', categoria: 'palestrante' }),
    T('adesivo-selo', 'adesivo', { forma: 'selo', cores: 'verde-vivo' }), T('adesivo-fita', 'adesivo', { forma: 'fita', cores: 'amarelo-verde' }), T('adesivo-carimbo', 'adesivo', { forma: 'carimbo', cores: 'azul-branco' }), T('adesivo-ilustracao', 'adesivo', { forma: 'ilustracao', ilustracao: 'masp', cores: 'vivo-noite' }), T('adesivo-made-in', 'adesivo', { forma: 'made-in', cores: 'branco-verde' }),
    T('post-amarelo', 'post', { paleta: 'amarelo' }), T('slide-divisor', 'slide', { layout: 'divisor' })
  ];
})();
