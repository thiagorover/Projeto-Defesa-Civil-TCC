# README - DEMONSTRAÇÃO TCC #

#### Requirements ####

* Node.js 8.0 or greater.
* Npm 3.0 or greater.
* angular-cli.

### Instalação ###

* Para uma usabilidade melhor, intale o `nodemon` de forma global -> 'npm i -g nodemon'

* Clonar o repositório -> 'senaidefesacivil/*'
* Dentro do repositório ´master` baixar as dependências do projeto utilizando o comando 'npm install'


### Configuração BD ###

* Criar um arquivo com o nome de `.env` conforme `.env.example`
* Criar o database "adonis" no mysql
* Executar o comando 'migration:run' no cmd para criação do banco. -> 'npm run migration'
* Criar um usuário atraves do 'script_inicializacao' no MySQL workbench 
	* Dados do usuario gravado no script
		* `name`:`Admin`,
		* `email`:`admin@senai.br`,
		* `password`:`123`,
		* `is_admin`:`1`,
		* `profile`: `1`
	
	* Criar as permissões de `moderador` e `notification`, para respectivamente ter as permissões de moderador e de inserir notificações

### Instalação ###

* Dentro do repositório `defesacivilsenai/defesacivilwebmanager` baixar as dependências do projeto utilizando o comando `npm install`
* Mudar o endereço da chamada da api rest no arquivo `environment.ts`, por padrão está `http://localhost:3333`

### Geração do build ###

* Utilizar o comando ´ng build` para gerar o build do projeto
* Irá gerar a pasta dist no diretório 'defesacivilsenai/defesacivilwebmanager', 
	copie para a pasta 'defesacivilsenai\api-adonis-js\public'
	copie tambem a pasta 'defesacivilweb'
* Após configurar o servidor adonis, utilizar o comando 'nodemon' para subir o servidor, o endereço web, ficará com o path do servidor + o nome da pasta colocada no diretório `defesacivilsenai\api-adonis-js\public`
	"http://localhost:3333/dist/#/"
