# Room Access Back

Backend do sistema de controle de acesso a salas, construído com **NestJS**, **Prisma**, **TypeScript**, **Biome** e **Jest**, seguindo os princípios de **DDD** e **Clean Architecture**.

---

## Stack

| Ferramenta | Finalidade |
|---|---|
| NestJS | Framework HTTP (Fastify adapter) |
| Prisma | ORM / migrations |
| TypeScript | Type safety |
| Biome | Linter + Formatter |
| Jest + SWC | Testes unitários (rápido) |
| Swagger | Documentação da API |
| Zod / class-validator | Validação de entrada |

---

## Arquitetura

```
src/
├── core/                         # Shared Kernel (agnóstico de domínio)
│   ├── domain/
│   │   ├── entities/             # Entity & AggregateRoot base
│   │   ├── value-objects/        # ValueObject & UniqueEntityId
│   │   ├── events/               # DomainEvent base
│   │   └── errors/               # DomainError, Either (Result pattern)
│   ├── application/
│   │   ├── use-case.interface.ts # Contrato genérico de UseCase
│   │   └── pagination.ts         # Paginação reutilizável
│   └── infrastructure/
│       ├── database/             # PrismaService + DatabaseModule (Global)
│       └── http/filters/         # DomainExceptionFilter
│
└── modules/
    └── rooms/                    # Módulo de salas (exemplo)
        ├── domain/
        │   ├── entities/         # Room (AggregateRoot)
        │   ├── value-objects/    # RoomName (ValueObject)
        │   └── repositories/     # RoomRepository (interface abstrata)
        ├── application/
        │   └── use-cases/
        │       ├── create-room/  # DTO + UseCase + spec
        │       ├── find-room/    # DTO + UseCase + spec
        │       └── list-rooms/   # UseCase
        ├── infrastructure/
        │   ├── controllers/      # RoomController (HTTP)
        │   ├── repositories/     # PrismaRoomRepository + InMemoryRoomRepository
        │   ├── mappers/          # RoomMapper (domain ↔ persistence)
        │   └── presenters/       # RoomPresenter (domain → HTTP response)
        └── rooms.module.ts
```

### Camadas e responsabilidades

- **Domain**: regras de negócio puras, sem dependências externas. Entidades, Value Objects, erros de domínio.
- **Application**: orquestra casos de uso. Depende apenas de interfaces do domínio.
- **Infrastructure**: implementações concretas (Prisma, HTTP controllers). Depende das camadas acima.
- **Core**: primitivos compartilhados entre todos os módulos (Entity, VO, Either, etc).

---

## Padrões adotados

- **Either / Result Pattern** — casos de uso retornam `Either<Error, Output>` ou lançam `DomainError`
- **Repository Pattern** — `RoomRepository` é uma classe abstrata injetada via DI; produção usa Prisma, testes usam `InMemoryRoomRepository`
- **Mapper** — isola a conversão entre modelo Prisma e entidade de domínio
- **Presenter** — formata a resposta HTTP sem expor detalhes internos da entidade
- **AggregateRoot** — suporta domain events (adicionados com `addDomainEvent`)

---

## Setup

```bash
# 1. Copie as variáveis de ambiente
cp .env.example .env

# 2. Instale as dependências
npm install

# 3. Gere o Prisma Client
npm run prisma:generate

# 4. Rode as migrations (precisa de banco Postgres rodando)
npm run prisma:migrate

# 5. Popule dados iniciais (opcional)
npm run prisma:seed

# 6. Inicie em modo desenvolvimento
npm run start:dev
```

A API estará disponível em `http://localhost:3000/api/v1`.
Documentação Swagger em `http://localhost:3000/api/docs`.

---

## Testes

```bash
# Unitários
npm test

# Com cobertura
npm run test:cov

# Watch mode
npm run test:watch
```

---

## Lint & Format

```bash
# Verificar e corrigir lint + format
npm run check

# Somente format
npm run format

# Somente lint
npm run lint
```

---

## Adicionando um novo módulo

1. Crie a pasta `src/modules/<nome>/`
2. Implemente `domain/entities/`, `domain/value-objects/`, `domain/repositories/`
3. Crie os use-cases em `application/use-cases/`
4. Implemente o repositório Prisma em `infrastructure/repositories/`
5. Crie o controller em `infrastructure/controllers/`
6. Registre tudo em `<nome>.module.ts` e importe no `AppModule`
