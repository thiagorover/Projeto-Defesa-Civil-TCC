# README #

### Instalação ###

* Você precisará ter o ```Node``` e o ```NPM``` instalado na sua maquina
* Para uma usabilidade melhor, instale o ```angular-cli``` de forma global -> ```npm i -g @angular/cli```
* Clonar o repositório -> `https://mr-mateus@bitbucket.org/mr-mateus/defesacivilsenai.git`
* Dentro do repositório ```defesacivilsenai/defesacivilwebmanager``` baixar as dependências do projeto utilizando o comando ```npm install```
* Mudar o endereço da chamada da api rest no arquivo ```environment.ts```, por padrão está ```http://localhost:3333```

### Geração do build ###

* Utilizar o comando ```ng build --prod``` para gerar o build do projeto
* Irá gerar a pasta dist no diretório ```defesacivilsenai/defesacivilwebmanager```, copie para a pasta ```defesacivilsenai\api-adonis-js\public```
* Após configurar o servidor adonis, utilizar o comando ```nodemon``` para subir o servidor, o endereço web, ficará com o path do servidor + o nome da pasta colocada no diretório ```defesacivilsenai\api-adonis-js\public```

