# Magic The Gathering Scraper
## Para começar
###### Técnologias utilizadas:

`Node.js : https://nodejs.org/en/`

`MongoDB : https://www.mongodb.com/`

`Magic the Gathering IO: https://magicthegathering.io/`

1. Você precisa ter o node juntamente com o npm instalado em sua máquina, para verificar: node -v, npm -v Versões utilizadas: Node 8.12 e Npm 6.4.1 (Não obrigatoriamente necessárias, somente a título de informação).

2. Rode o comando `npm install`;

3. Crie a pasta `img` no diretório em que será executado o script `scraper`;

4. No console será mostrado o nome da carta baixada e a url da carta;

5. Obrigatoriamente precisa-se do `MongoDB` instalado para cadastrar o nome das imagens no banco, o banco será criado automaticamente, com o nome de `mtg` e coleção `cards`, certifique-se de que o serviço do mongo esta rodando.

6. As imagens são salvas com o ID que vem da prórpria estrutura do JSON da carta, evitando que cartas com o nomes iguais (edições diferentes) sobrepoẽm umas as outras.

7. O ultimo passo é esperar baixar todas as cartas, este script esta sendo atualizando no momento e pode ser que aconteça erros inesperados.
