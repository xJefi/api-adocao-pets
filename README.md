# API de Adoção de Pets 🐶🐱

## 📋 Descrição do Projeto
API REST desenvolvida em Node.js para gerenciamento de adoção de animais de estimação. O sistema permite o gerenciamento de usuários e pets, autenticação e controle de acessos com JWT, controle de pets e fluxo completo de adoção.

---

## 🚀 Tecnologias utilizadas:
- Node.js
- Express
- MySQL
- JWT (autenticação)
- bcryptjs (criptografia de senha)
- ESLint + Prettier

---

## 📂 Arquitetura da Aplicação

O projeto foi desenvolvido seguindo uma arquitetura em camadas para garantir a separação clara de responsabilidades:

```text
├── /src
│   ├── config         # Configuração do banco de dados MySQL
│   ├── controllers    # Lógica de controle das requisições e respostas HTTP
│   ├── database       # Scripts de criação e inserts do banco de dados
│   ├── middlewares    # Validações de dados e controle de autenticação/autorização (JWT)
│   ├── models         # Acesso direto ao banco de dados
│   ├── routes         # Definição das rotas da API
│   └── services       # Regras de negócio da aplicação 
├── /tests             # Arquivos de testes (REST Client / Postman / Insomnia)
├── eslint.config.mjs  # Configuração de linting do código
├── .prettierrc        # Configuração de formatação do código
└── README.md          # Documentação do projeto
├── app.js             # Configuração principal do Express (middlewares e rotas)
├── server.js          # Inicializa o servidor e conecta na porta definida no .env
```

---

## 🔐 Autenticação

A autenticação é feita via JWT.

Login retorna um token
O token deve ser enviado no header:

Authorization: Bearer <token>

---

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza MySQL com três tabelas principais:

### 1. Tabela `users`

| Campo      | Tipo   | Descrição                                |
| ---------- | ------ | ---------------------------------------- |
| `id`       | INT    | Identificador único (Auto Incremento)    |
| `name`     | STRING | Nome completo                            |
| `email`    | STRING | E-mail (Único)                           |
| `password` | STRING | Senha criptografada com bcrypt           |
| `phone`    | STRING | Telefone de contato                      |
| `role`     | STRING | Perfil do usuário (`admin` ou `adopter`) |

### 2. Tabela `pets`

| Campo         | Tipo   | Descrição                                    |
| ------------- | ------ | -------------------------------------------- |
| `id`          | INT    | Identificador único (Auto Incremento)        |
| `name`        | STRING | Nome do pet                                  |
| `age`         | INT    | Idade aproximada em anos                     |
| `species`     | STRING | Espécie (ex: `dog`, `cat`)                   |
| `size`        | STRING | Porte do animal (`small`, `medium`, `large`) |
| `status`      | STRING | Situação (`available`, `adopted`)            |
| `description` | STRING | Texto opcional com informações adicionais    |

### 3. Tabela `adoptions`

| Campo           | Tipo     | Descrição                                               |
| --------------- | ----     | ------------------------------------------------------- |
| `id`            | INT      | Identificador da adoção (Auto Incremento)               |
| `user_id`       | INT      | ID do usuário que realizou a adoção (Chave Estrangeira) |
| `pet_id`        | INT      | ID do pet adotado (Chave Estrangeira)                   |
| `adoption_date` | DATETIME | Data da adoção                                          |

---

## 🛡️ Regras de Negócio Implementadas

- **Segurança:** As senhas dos usuários nunca são retornadas em formato JSON nas respostas da API.
- **Perfil Padrão:** Ao cadastrar um novo usuário, o campo `role` assume o valor padrão `"adopter"`.
- **Restrições de Acesso (Pets):** Apenas usuários com perfil `"admin"` podem cadastrar, atualizar ou remover pets.

- **Fluxo de Adoção:**
    - Apenas usuários `adopter` podem adotar um pet.
    - O pet precisa estar com o status `available` para que a adoção seja efetuada.
    - Após concluir a adoção, o status do pet muda automaticamente para `adopted`.
    - Um usuário não pode adotar o mesmo pet mais de uma vez.
    - Pets com status `adopted` não podem ser readotados e nem removidos do sistema.

---

## ⚙️ Como rodar o projeto

1. Clone este repositório

```bash
git clone https://github.com/xJefi/api-adocao-pets.git
 ```

2. Instalar dependências

```bash
npm install
 ```

3. Crie um arquivo `.env` na raiz do projeto seguindo o modelo do `.env.example`:

```properties
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_DATABASE=pets_db
PORT=3000
JWT_SECRET=SenhaSecreta

4. Criar banco

Executar o arquivo no seu cliente MySQL (como Workbench ou DBeaver)

- src/database/schema.sql

5. Rodar seed (opcional)

```bash
npm run seed
```

6. Iniciar servidor

```bash
npm run dev
```

### Scripts Disponíveis (`package.json`)

- **Executar em modo de desenvolvimento:**

```bash
npm run dev
```

**Executar a validação do ESLint:**

```bash
npm run lint
```

---

## 🧪 Testes

O projeto inclui arquivos .rest para testes manuais:

- test_auth.rest
- test_user.rest
- test_pet.rest
- test_adoptions.rest

---

## 🛣️ Endpoints da API

### Rotas Públicas

| Método | Rota              | Descrição                                                 |
| ------ | ----------------- | --------------------------------------------------------- |
| `GET`  | `/pets/available` | Lista todos os pets com status "available"                |
| `POST` | `/auth/users`     | Cadastra um novo usuário                                  |
| `POST` | `/auth/login`     | Realiza autenticação e retorna o Token JWT (expira em 1h) |

### Rotas Protegidas (Requerem Token JWT)

#### Usuários

| Método   | Rota         | Descrição                           | Permissão de Acesso                 |
| -------- | ------------ | ----------------------------------- | ----------------------------------- |
| `GET`    | `/users`     | Lista todos os usuários do sistema  | `admin`                             |
| `GET`    | `/users/:id` | Busca os dados de um usuário por ID | `admin` ou o próprio usuário logado |
| `PUT`    | `/users/:id` | Atualiza os dados de um usuário     | `admin` ou o próprio usuário logado |
| `DELETE` | `/users/:id` | Remove um usuário do sistema        | `admin`                             |

#### Pets

| Método   | Rota        | Descrição                                      | Permissão de Acesso |
| -------- | ----------- | ---------------------------------------------- | ------------------- |
| `GET`    | `/pets`     | Lista todos os pets (inclusive adotados)       | `admin`             |
| `GET`    | `/pets/:id` | Busca um pet específico por ID                 | `admin`             |
| `POST`   | `/pets`     | Cadastra um novo pet no sistema                | `admin`             |
| `PUT`    | `/pets/:id` | Atualiza os dados de um pet existente          | `admin`             |
| `DELETE` | `/pets/:id` | Remove um pet (apenas se `status = available`) | `admin`             |

#### Adoções

| Método | Rota         | Descrição                                 | Permissão de Acesso |
| ------ | ------------ | ----------------------------------------- | ------------------- |
| `GET`  | `/adoptions` | Lista o histórico de todas as adoções     | `admin`             |
| `POST` | `/adoptions` | Registra a adoção de um animal disponível | `adopter`           |

---

## 📌 Observações
- Arquitetura em camadas (Controller → Service → Model).
- Projeto desenvolvido como avaliação para a disciplina de **Desenvolvimento de Serviços Web** da faculdade de Análise e Desenvolvimento de Sistemas do IFRS.
- Foco em boas práticas de autenticação e autorização.