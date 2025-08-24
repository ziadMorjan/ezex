# EzEx CLI - Modern Express Scaffold

EzEx (`ezex`) is a CLI tool for quickly scaffolding modern Express.js applications with batteries included.

## Features

- Express 4 setup with ESM
- MongoDB (Mongoose) support
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
ezex create my-app --db --cors --morgan --linting --git
```

Creates an Express app in `my-app/` with selected features.

- `--db` → Add MongoDB (Mongoose)
- `--cors` → Enable CORS
- `--morgan` → Add Morgan logger
- `--linting` → ESLint + Prettier setup
- `--git` → Initialize git repo
- `--force` → Overwrite existing files
- `--dry-run` → Show what would be created without writing

### Generate CRUD files

```bash
ezex model User
ezex controller User
ezex router User
```

### Example

```bash
ezex create . --db --linting --git --force
```

This will scaffold the project in the current folder, include MongoDB, ESLint, Git, and overwrite existing files if any.

## Notes

- `.env` variables are scaffolded into `config.env`
- Generated projects use ESM (`"type": "module"`)
- Run `npm run dev` to start in development mode
