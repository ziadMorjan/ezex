# EzEx CLI - Modern Express Scaffold

EzEx (`ezex`) is a CLI tool for quickly scaffolding modern Express.js applications with batteries included.

## Features

- Express 4 setup with ESM
- MongoDB (Mongoose) support
- PostgreSQL (Raw SQL or ORM) support ✅
- Configurable CORS & Morgan
- Error handling middleware
- ESLint + Prettier integration
- Git initialization
- CRUD generators (model, controller, router)
- Safe file creation (no overwrite unless `--force`)
- Dry-run mode

## Installation

```bash
npm install -g ezex
```

## Usage

### Create a new project

```bash
# With MongoDB
ezex create my-app --db

# With PostgreSQL (Raw SQL)
ezex create my-app --pg-raw

# With PostgreSQL (ORM)
ezex create my-app --pg-orm
```

- `--db` → Add MongoDB (Mongoose)  
- `--pg-raw` → Add PostgreSQL (Raw SQL via `pg`)  
- `--pg-orm` → Add PostgreSQL with ORM (Sequelize)  
- `--cors` → Enable CORS  
- `--morgan` → Add Morgan logger  
- `--linting` → ESLint + Prettier setup  
- `--git` → Initialize git repo  
- `--force` → Overwrite existing files  
- `--dry-run` → Show what would be created without writing  

### Example

```bash
ezex create . --pg-orm --linting --git --force
```

This will scaffold the project in the current folder, include PostgreSQL (ORM), ESLint, Git, and overwrite existing files if any.

## PostgreSQL Support

EzEx now supports PostgreSQL in addition to MongoDB.

### Options

- `--pg-raw` → Add PostgreSQL (Raw SQL via `pg`)  
- `--pg-orm` → Add PostgreSQL with ORM (Sequelize)  

### Example

```bash
# Using raw SQL
ezex create my-app --pg-raw

# Using ORM (Sequelize)
ezex create my-app --pg-orm
```

Both options will scaffold the database connection and add `PG_URI` to `config.env`.
