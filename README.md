# WhatsApp Web - Frontend

Frontend da aplicação responsável pela interface de gerenciamento da conexão com o WhatsApp Web e pelo envio de mensagens.

## Tecnologias

* Angular
* TypeScript
* HTML
* CSS

## Funcionalidades

* Conexão com o WhatsApp Web
* Visualização do QR Code para autenticação
* Desconexão da sessão
* Envio de mensagens
* Acompanhamento do status da conexão
* Recebimento de notificações em tempo real através de SSE

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

* Node.js
* npm
* Angular CLI

Verifique as instalações:

```bash
node --version
npm --version
ng version
```

## Como executar

Clone o repositório e acesse a pasta do frontend:

```bash
git clone <URL_DO_REPOSITORIO>
cd <PASTA_DO_FRONTEND>
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

## Comunicação com o Backend

O frontend utiliza a API disponibilizada pelo backend em:

```text
http://localhost:8080
```

Portanto, o backend deve estar em execução para que as funcionalidades de conexão, envio de mensagens e notificações funcionem corretamente.
