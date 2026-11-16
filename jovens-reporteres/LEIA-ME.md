# Jovens Repórteres BC 2027 | Apresentação para parceiros

Site único com a parte institucional da Brazil Conference e a proposta do programa Jovens Repórteres.

## Como apresentar
- Abra o link no Chrome, aperte **F** para tela cheia e use as **setas** para passar.

## Como editar
- Todo o conteúdo está em `index.html`. Cada tela começa com um comentário, por exemplo `<!-- BC: EM NÚMEROS -->`.
- Para trocar um texto, edite o trecho entre as tags e salve (no GitHub: abra o arquivo, clique no lápis, edite e faça o commit).
- Para esconder uma tela, apague o bloco `<section class="tela" ...> ... </section>` dela.

## Vídeo institucional
- No fim do `index.html`, no bloco `CONFIGURAÇÃO`, preencha `video:` com um link do YouTube
  ou coloque o arquivo em `assets/video/` e use `video: 'assets/video/nome-do-arquivo.mp4'`.
- Com o campo vazio, a tela do vídeo não aparece.
