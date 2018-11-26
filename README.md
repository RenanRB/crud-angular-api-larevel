# crud-angular-api-laravel

Projeto realizado com Angular 6 (pasta interface) e Laravel (pasta api)

## Configuração Angular

- Rodar o comando `npm install` para baixar as dependencias do projeto.

- Por motivos de CORS foi adicionado o arquivo src/proxy.config.json. Neste arquivo tem as configurações de proxy para acessar a API, por padrão já está configuirado para o IP do laravel homestead, caso o IP seja diferente basta alterar a linha targuet para o ip da API

- Após essa configuração já é possível subir o servidor com o comando `ng serve --open`

## Laravel

- Rodar o comando `composer install` para baixar as dependencias do projeto.

- Configurar os dados do banco de dados dentro do arquivo .env

- Caso esteja utilizando laravel homestead é necessário fazer as configurações do arquivo Homestead.yaml que fisca dentro da pasta Homestead.

- Após ter feito a configuração basta subir o serviço com o comando `vagrant up`

- Assim que o processo for finalizado acesse os arquivos por ssh com o comando `vagrant ssh`

- Acesse o diretório da api, por padrão é `cd code/api`

- Execute o comando `php artisan migrate` para executar as migrations e criar as tabelas do banco de dados.