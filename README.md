# CRUD Pacientes 🏥

Aplicação CRUD (Create, Read, Update, Delete) para cadastro de pacientes, com validação de CPF. Backend em **NestJS + TypeORM + PostgreSQL**, frontend em **React + TypeScript + Material UI**.

> Projeto de estudo. Todos os dados de exemplo deste repositório são fictícios.

## 🚀 Tecnologias

**Backend**
- NestJS 12
- TypeORM + PostgreSQL (driver `pg`)
- `@nestjs/config` (variáveis de ambiente)
- `class-validator` + `class-transformer` (validação e transformação dos DTOs)
- `class-validator-cpf` (validação de CPF)
- TypeScript, Vitest, oxlint e Prettier

**Frontend**
- React 19 + TypeScript
- Vite
- Material UI (MUI) + Emotion
- `date-fns` (formatação de datas)
- `material-ui-confirm` (diálogo de confirmação ao excluir)
- oxlint

## 📁 Estrutura do projeto

```
11crud_patient/
├── backend/
│   ├── src/
│   │   ├── patients/
│   │   │   ├── dto/
│   │   │   │   ├── create-patient.dto.ts
│   │   │   │   └── update-patient.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── patient.entity.ts
│   │   │   ├── patients.controller.ts
│   │   │   ├── patients.service.ts
│   │   │   └── patients.module.ts
│   │   ├── app.module.ts      # Configuração do TypeORM e dos módulos
│   │   └── main.ts            # Bootstrap, CORS e ValidationPipe global
│   ├── test/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── FormsPatients.tsx   # Formulário de cadastro/edição
│   │   │   └── ListarPatients.tsx  # Lista de pacientes
│   │   ├── utils/
│   │   │   ├── formatData.ts
│   │   │   └── formatSexo.ts
│   │   ├── api.ts                  # Chamadas HTTP para o backend
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── README.md
```

## 🗄️ Modelo de dados

Tabela `patients` (criada automaticamente pelo TypeORM a partir da entidade `Patient`):

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | SERIAL PRIMARY KEY | Identificador único |
| `nome` | VARCHAR NOT NULL | Nome do paciente |
| `data_nascimento` | DATE NOT NULL | Data de nascimento |
| `CPF` | VARCHAR UNIQUE NOT NULL | CPF (armazenado somente com dígitos) |
| `email` | VARCHAR NOT NULL | E-mail |
| `sexo` | VARCHAR NOT NULL | `M` (Masculino) ou `F` (Feminino) |

> O TypeORM cria as **tabelas**, mas não o **banco de dados**. Crie o banco vazio antes de iniciar o backend.

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/) instalado e rodando
- Um banco de dados vazio criado, por exemplo:

```sql
CREATE DATABASE crud_patient;
```

## 🔧 Instalação e configuração

### 1. Clone o repositório

```bash
git clone https://github.com/llucaspadua8/<nome-do-repositorio>.git
cd <nome-do-repositorio>
```

### 2. Configure o backend

```bash
cd backend
npm install
```

Copie o arquivo de exemplo e preencha com os dados do seu PostgreSQL:

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_DATABASE=crud_patient
```

> ⚠️ O arquivo `.env` contém credenciais e **não deve ser versionado** (já está no `.gitignore`).

Inicie o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

O backend ficará disponível em `http://localhost:3000`.

### 3. Configure o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5173` (porta padrão do Vite). A URL da API está definida em `frontend/src/api.ts` e aponta para `http://localhost:3000`.

## 📡 Endpoints da API

| Método | Rota | Descrição | Sucesso |
|---|---|---|---|
| `POST` | `/patients` | Cadastra um novo paciente | `201` |
| `GET` | `/patients` | Lista todos os pacientes | `200` |
| `GET` | `/patients/:id` | Busca um paciente pelo id | `200` |
| `PATCH` | `/patients/:id` | Atualiza um paciente | `200` |
| `DELETE` | `/patients/:id` | Remove um paciente | `200` |

### Exemplo de corpo para `POST` e `PATCH`

```json
{
  "nome": "Maria da Silva",
  "data_nascimento": "1990-05-20",
  "CPF": "52998224725",
  "email": "maria@exemplo.com",
  "sexo": "F"
}
```

> O CPF acima é fictício (gerado apenas para testes). O `PATCH` segue as mesmas regras do cadastro: todos os campos são obrigatórios.

### Respostas de erro

| Status | Quando acontece |
|---|---|
| `400` | Falha de validação (campo inválido, ausente, ou propriedade não permitida) |
| `404` | Paciente não encontrado (`GET`, `PATCH` ou `DELETE` com id inexistente) |
| `409` | Já existe um paciente com o mesmo CPF |

## ✅ Validações

**Backend** (`class-validator`, via `ValidationPipe` global com `whitelist: true`):

| Campo | Regras |
|---|---|
| `nome` | Texto, sem espaços nas pontas (`trim`), mínimo de 2 caracteres |
| `data_nascimento` | Data em formato ISO (`YYYY-MM-DD`) |
| `CPF` | CPF válido; pontos e traço são removidos antes de validar e salvar |
| `email` | E-mail válido |
| `sexo` | `M` ou `F` |

Propriedades que não existem no DTO são descartadas automaticamente (`whitelist`). A unicidade do CPF é verificada no serviço, tanto no cadastro quanto na edição.

**Frontend**: validação de campos obrigatórios e de data antes do envio, mensagens de erro por campo (`helperText` do MUI) e tradução das respostas de erro do backend (CPF inválido/duplicado, e-mail e nome inválidos) para o campo correspondente.

## 🖥️ Funcionalidades do frontend

- Formulário único para **cadastrar** e **editar** (ao clicar em "Editar", o formulário é preenchido com os dados do paciente)
- Lista de pacientes com data formatada (`dd/MM/yyyy`) e sexo por extenso
- Confirmação de exclusão com diálogo do Material UI
- Mensagem de sucesso após cadastrar ou salvar alterações

## 🧪 Scripts úteis

**Backend** (`backend/`)

| Comando | Descrição |
|---|---|
| `npm run start:dev` | Inicia em modo de desenvolvimento (watch) |
| `npm run build` | Compila o projeto |
| `npm run start:prod` | Executa a versão compilada |
| `npm run test` | Roda os testes (Vitest) |
| `npm run lint` | Roda o oxlint |

**Frontend** (`frontend/`)

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run lint` | Roda o oxlint |
| `npm run preview` | Visualiza o build localmente |

## 📝 Notas de desenvolvimento

Algumas configurações foram mantidas simples por se tratar de um projeto de estudo e **não devem ir para produção como estão**:

- `synchronize: true` no TypeORM cria/altera tabelas automaticamente a partir das entidades. Em produção, o recomendado é usar *migrations*.
- `app.enableCors()` libera qualquer origem. Em produção, restrinja ao domínio do frontend.
- A URL da API está fixa em `frontend/src/api.ts`. Em um deploy, vale movê-la para uma variável de ambiente do Vite (`VITE_API_URL`).

## 🔒 Privacidade

O projeto manipula dados pessoais (CPF, e-mail, data de nascimento). Use apenas dados fictícios em testes, capturas de tela e exemplos, e nunca versione dumps do banco ou o arquivo `.env`.

## 👤 Autor

Desenvolvido por [llucaspadua8](https://github.com/llucaspadua8)
