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

### Gerenciamento

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

## Arquitetura

O frontend utiliza Next.js com App Router e possui uma camada intermediária de rotas da própria aplicação para operações autenticadas.

```text
Frontend
   │
   ├── Páginas públicas
   │
   ├── Área autenticada
   │
   ├── API Routes do Next.js
   │
   └── Serviços de API
            │
            ▼
      Backend NestJS
            │
            ▼
        PostgreSQL
```
