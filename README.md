# Desafio Lar

Aplicação desenvolvida como parte do desafio técnico da Lar.

O projeto consiste em uma aplicação para gerenciamento de pessoas e seus respectivos telefones, permitindo realizar operações de cadastro, consulta, atualização e exclusão.

O backend foi desenvolvido utilizando **.NET 10 / ASP.NET Core Web API**, com **Entity Framework Core** para persistência dos dados e **PostgreSQL** como banco de dados.

A aplicação segue uma organização baseada em **Clean Architecture**, utilizando princípios de **DDD** e **SOLID**, com separação entre domínio, aplicação, infraestrutura e apresentação.

## Tecnologias

- .NET 10
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Swagger
- C#
- Clean Architecture
- DDD
- SOLID

## Como executar

### Pré-requisitos

- .NET 10 SDK
- PostgreSQL
- Visual Studio 2022 ou superior

### Banco de dados

Crie um banco PostgreSQL chamado:

**desafiolardb**

A aplicação utiliza:

- **Host:** localhost
- **Porta:** 5432
- **Database:** desafiolardb
- **Username:** postgres

A senha do banco deve ser configurada através do **.NET User Secrets**.

Na pasta do projeto `DesafioLar`, execute:

    dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=desafiolardb;Username=postgres;Password=SUA_SENHA"

### Executar as migrations

No Visual Studio, abra o **Package Manager Console**:

**Ferramentas → Gerenciador de Pacotes do NuGet → Console do Gerenciador de Pacotes**

Selecione `DesafioLar.Infrastructure` como projeto padrão e execute:

    Update-Database

### Executar a aplicação

Abra a solução:

**DesafioLar.slnx**

Defina o projeto `DesafioLar` como projeto de inicialização e execute a aplicação pelo Visual Studio (`F5`).

Após iniciar, a documentação da API estará disponível através do Swagger:

**https://localhost:7196/swagger**
