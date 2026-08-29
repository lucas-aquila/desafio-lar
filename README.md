# Desafio Lar

Aplicação desenvolvida como parte do desafio técnico da Lar.

O projeto consiste em uma aplicação para gerenciamento de pessoas e seus respectivos telefones, permitindo realizar operações de cadastro, consulta, atualização e exclusão.

O backend foi desenvolvido utilizando **.NET 10 / ASP.NET Core Web API**, com **Entity Framework Core** para persistência dos dados e **PostgreSQL** como banco de dados.

O frontend foi desenvolvido utilizando **Angular** e **Angular Material**.

A aplicação segue uma organização baseada em **Clean Architecture**, utilizando princípios de **DDD** e **SOLID**, com separação entre domínio, aplicação, infraestrutura e apresentação.

## Tecnologias

### Backend
- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- C#
- PostgreSQL
- Swagger

### Frontend
- Angular 21
- Angular Material
- TypeScript
- RxJS

### Arquitetura e Infraestrutura
- Clean Architecture
- DDD
- SOLID
- Docker
- Docker Compose

## Como executar

A aplicação pode ser executada de duas formas:

- [Com Docker](#com-docker)
- [Sem Docker](#sem-docker)

---

## Com Docker

### Pré-requisitos

- Docker
- Docker Compose

### Executar

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O Docker irá automaticamente:

- Criar o container do PostgreSQL;
- Criar o banco de dados desafiolardb;
- Iniciar o backend .NET;
- Aplicar as migrations do Entity Framework Core;
- Iniciar o frontend Angular.

Após a inicialização, acesse:

**Frontend:**
http://localhost:4200

**Swagger:**
http://localhost:5276/swagger

### Para parar os containers:
```bash
docker compose down
```

## Sem Docker

### Pré-requisitos

- .NET 10 SDK
- Node.js 22 LTS
- npm 12.0.2
- PostgreSQL
- Visual Studio 2022 ou superior

### Banco de dados

Crie o banco PostgreSQL `desafiolardb` e configure a senha através do **.NET User Secrets**:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=desafiolardb;Username=postgres;Password=SUA_SENHA"
```

### Executar
Na pasta **frontend/DesafioLar.Web**, execute:
```bash
npm install
npm run start:all
```

O comando inicia o frontend Angular e o backend .NET simultaneamente.
As migrations do Entity Framework Core são aplicadas automaticamente ao iniciar o backend.

Acesse:
**Frontend:**
http://localhost:4200

**Swagger:**
http://localhost:5276/swagger
