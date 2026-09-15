# Educa Blog

Aplicação web desenvolvida como parte do Tech Challenge, com o objetivo de disponibilizar uma plataforma de publicação e gerenciamento de posts relacionados à educação e tecnologia.

O projeto possui uma interface pública para consulta dos posts e uma área autenticada para gerenciamento das publicações do usuário.

## Funcionalidades

### Área pública

- Listagem de posts
- Busca de posts
- Paginação
- Visualização detalhada de um post
- Acesso à tela de login
- Cadastro de usuário

### Área autenticada

- Login de usuário
- Visualização dos próprios posts
- Criação de posts
- Edição de posts
- Exclusão de posts
- Paginação dos próprios posts
- Logout

### Gerenciamento de usuários

- Cadastro de usuários
- Edição de usuários
- Listagem de usuários

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- API REST desenvolvida em NestJS
- PostgreSQL
- Docker
- Docker Compose
- GitHub Actions

## Arquitetura

O frontend utiliza Next.js com App Router e possui uma camada intermediária de rotas da própria aplicação para operações autenticadas.

```text
Frontend
   │
   ├── Páginas públicas
   ├── Área autenticada
   ├── API Routes do Next.js
   └── Serviços de API
            │
            ▼
      Backend NestJS
            │
            ▼
        PostgreSQL
```

### Comunicação com a API

As operações autenticadas são intermediadas pelas API Routes do Next.js.

No desenvolvimento local, o frontend se comunica com a API através de:

`http://localhost:3001/api/v1`

Quando executados através do Docker Compose, os containers utilizam a rede interna do Docker:

```text
Frontend
   │
   ▼
http://api:3001/api/v1
   │
   ▼
NestJS
```

O nome `api` corresponde ao nome do serviço definido no Docker Compose.

## Autenticação

A autenticação é realizada através de JWT.

Após o login, o token de acesso retornado pela API é armazenado pelo frontend em cookie `HttpOnly`.

Os cookies utilizados são:

- `access_token`
- `auth_user`

As páginas protegidas verificam a existência da sessão antes de permitir o acesso.

O logout remove os cookies de autenticação através de uma API Route do Next.js.

### Fluxo de autenticação

```text
Usuário
   │
   ▼
Tela de Login
   │
   ▼
Next.js API Route
   │
   ▼
NestJS /auth/login
   │
   ▼
JWT
   │
   ▼
Cookie HttpOnly
   │
   ▼
Área autenticada
```

## Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js 24+
- npm
- Docker
- Docker Compose

O backend da aplicação também é necessário para o funcionamento completo do frontend.

## Configuração

Crie um arquivo `.env` na raiz do frontend:

```env
API_INTERNAL_URL=http://localhost:3001/api/v1
```

Essa configuração é utilizada quando o frontend é executado diretamente com Node.js.

Quando o frontend é executado através do Docker Compose, a variável é sobrescrita pelo próprio Compose para utilizar a comunicação interna entre os containers:

```env
API_INTERNAL_URL=http://api:3001/api/v1
```

O arquivo `.env` não deve ser versionado no repositório.

## Execução local

Instale as dependências:

```bash
npm install
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

`http://localhost:3000`

## Build de produção

Para gerar o build de produção:

```bash
npm run build
```

Para executar a aplicação gerada pelo build:

```bash
npm start
```

## Execução com Docker Compose

O projeto possui configuração Docker para executar o frontend junto com a API, PostgreSQL e pgAdmin.

O Docker Compose utilizado para o ambiente integrado está localizado no projeto do backend.

## Clonando os projetos
Clone os dois repositórios mantendo a estrutura esperada:

cd ~/Projetos

git clone URL_DO_REPOSITORIO_BACKEND post-api (https://github.com/Victoria-Panzenhagen/post-api.git)
git clone URL_DO_REPOSITORIO_FRONTEND frontend-educa-blog
```

A estrutura deverá ficar:
Projetos
├── post-api
└── frontend-educa-blog

O serviço `frontend` do Docker Compose utiliza o frontend através do caminho relativo:

```text
../frontend-educa-blog
```

### Iniciando o ambiente completo

A partir do diretório do backend:

```bash
cd ~/Projetos/post-api
```

Execute:

```bash
docker compose up --build
```

Esse comando inicializa todos os serviços necessários para a aplicação.

Não é necessário executar docker build ou informar manualmente o caminho do frontend. O próprio docker-compose.yml utiliza o diretório ../frontend-educa-blog como contexto de build.

### Serviços Docker

| Serviço | Endereço |
|---|---|
| Frontend | `http://localhost:3000` |
| API | `http://localhost:3001` |
| Swagger | `http://localhost:3001/docs` |
| PostgreSQL | `localhost:5432` |
| pgAdmin | `http://localhost:5050` |

### Comunicação entre os containers

O frontend se comunica com a API através da rede interna do Docker:

```text
Frontend
   │
   ▼
api:3001
   │
   ▼
API NestJS
   │
   ▼
PostgreSQL
```

O navegador acessa a aplicação através de:

`http://localhost:3000`

### Parar os containers

Para parar os serviços:

```bash
docker compose down
```

Os volumes persistentes do PostgreSQL não são removidos por esse comando.

### Remover containers e volumes

Caso seja necessário remover também os dados persistidos:

```bash
docker compose down -v
```

Esse comando remove os volumes e, consequentemente, os dados armazenados no PostgreSQL.

### Reconstruir as imagens

Quando houver alterações no Dockerfile ou nas dependências:

```bash
docker compose up --build
```

## Docker

O frontend utiliza um Dockerfile com build em múltiplos estágios.

A estrutura utiliza:

```text
base
 │
 ├── deps
 │     └── instalação das dependências
 │
 ├── builder
 │     └── build do Next.js
 │
 └── runner
       └── execução da aplicação em produção
```

O Next.js utiliza o modo standalone, permitindo executar somente os arquivos necessários para a aplicação em produção.

O container final utiliza um usuário não-root para executar a aplicação.

## Variáveis de ambiente

### Frontend

A variável utilizada pelo frontend é:

```env
API_INTERNAL_URL=http://localhost:3001/api/v1
```

No ambiente Docker, o valor utilizado pelo container é:

```env
API_INTERNAL_URL=http://api:3001/api/v1
```

### Backend

As variáveis específicas da API, banco de dados e pgAdmin são configuradas no `.env` do backend.

Essas informações não devem ser commitadas no repositório quando contiverem credenciais ou outros dados sensíveis.

## Validação

Antes de enviar alterações para o repositório, o projeto pode ser validado através dos seguintes comandos.

### ESLint

```bash
npm run lint
```

### TypeScript

```bash
npx tsc --noEmit
```

### Build

```bash
npm run build
```

## CI/CD

O projeto utiliza GitHub Actions para realizar validações automáticas do código.

O workflow está localizado em:

```text
.github/workflows/ci.yml
```

### Quando o CI é executado

O workflow é executado em:

- Push para `main`
- Push para `develop`
- Push para branches `feature/**`
- Pull Requests direcionados para `main`
- Pull Requests direcionados para `develop`

### Pipeline

O pipeline executa as seguintes etapas:

```text
Git Push / Pull Request
          │
          ▼
    GitHub Actions
          │
          ▼
   Checkout do código
          │
          ▼
      Node.js 24
          │
          ▼
       npm ci
          │
          ▼
        ESLint
          │
          ▼
   TypeScript check
          │
          ▼
    Next.js build
          │
          ▼
      Docker build
```

O objetivo do pipeline é garantir que o código passe pelas principais validações técnicas antes de ser integrado às branches principais.

## Branches

O desenvolvimento é realizado utilizando branches de feature.

Exemplo:

```text
feature/iniciando_blog
```

As alterações podem ser posteriormente integradas às branches de desenvolvimento e principal através de Pull Requests.

O CI é executado nas branches de feature para identificar problemas ainda durante o desenvolvimento.

## Estrutura do projeto

```text
src/
├── app/
│   ├── admin/
│   │   ├── posts/
│   │   └── users/
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── discipline/
│   │   ├── posts/
│   │   └── users/
│   │
│   ├── cadastro/
│   ├── login/
│   └── posts/
│       ├── [id]/
│       ├── novo/
│       └── ...
│
├── components/
│   ├── forms/
│   ├── layout/
│   ├── posts/
│   ├── ui/
│   └── users/
│
├── lib/
│   ├── auth.ts
│   └── server-api.ts
│
├── services/
│   └── api/
│
└── types/
    ├── auth.ts
    ├── discipline.ts
    ├── post.ts
    └── user.ts
```

## Backend

O frontend consome uma API REST desenvolvida em NestJS.

A API possui funcionalidades relacionadas a:

- Autenticação
- Usuários
- Posts
- Disciplinas

### Principais endpoints utilizados

#### Autenticação

```text
POST /api/v1/auth/login
```

#### Posts

```text
GET    /api/v1/posts
GET    /api/v1/posts/:id
GET    /api/v1/posts/me
POST   /api/v1/posts
PUT    /api/v1/posts/:id
DELETE /api/v1/posts/:id
```

#### Disciplinas

```text
GET /api/v1/discipline
```

## Documentação da API

A API possui documentação através do Swagger:

`http://localhost:3001/docs`

## Ambiente de desenvolvimento

O projeto pode ser executado de duas formas.

### Execução sem Docker

```text
Frontend
localhost:3000
      │
      ▼
API
localhost:3001
      │
      ▼
PostgreSQL
```

### Execução com Docker

```text
Frontend container
      │
      │ api:3001
      ▼
API container
      │
      ▼
PostgreSQL container
```

A execução através do Docker Compose permite iniciar toda a infraestrutura necessária através de um único comando:

```bash
docker compose up --build
```

## Boas práticas utilizadas

O projeto foi desenvolvido buscando aplicar boas práticas de desenvolvimento, incluindo:

- Organização por responsabilidades
- Componentização
- Tipagem com TypeScript
- Validação de dados
- Autenticação baseada em JWT
- Uso de cookies HttpOnly
- Separação entre componentes de interface e serviços
- Tratamento de erros da API
- Paginação
- Responsividade
- Containerização
- Build otimizado para produção
- Execução do container com usuário não-root
- Integração contínua com GitHub Actions
- Validação automática de código antes da integração

## Objetivo do projeto

Além de atender aos requisitos do Tech Challenge, o projeto foi desenvolvido como oportunidade de aprofundamento técnico em:

- Next.js e App Router
- Integração entre frontend e API REST
- Autenticação
- Docker e Docker Compose
- Comunicação entre containers
- CI/CD
- GitHub Actions
- Organização de aplicações fullstack