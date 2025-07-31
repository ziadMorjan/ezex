# ⚡ ezex - Modern Express Scaffold CLI (v2.0)

**ezex** is a powerful, modernized command-line tool that helps you scaffold and extend **Express.js** projects with best practices. It now generates projects using **ES Modules (ESM)** by default and integrates **ESLint** and **Prettier** for superior code quality and consistency right from the start.

---

## ✨ Key Features

- **ESM First**: Generates projects using modern ES Modules syntax (`import`/`export`).
- **Code Quality Built-in**: Automatically sets up ESLint and Prettier with sensible defaults.
- **Intelligent Scaffolding**: Creates full CRUD structures (Model, Controller, Router) with a single command.
- **Highly Customizable**: Add features like CORS, Morgan, and MongoDB support interactively.
- **Developer-Friendly**: Improved error messages and a streamlined workflow.

---

## 📦 Installation

Install globally to use from any terminal:

```bash
npm install -g ezex
```

---

## 🚀 Quick Start

Create a new, full-featured API project named `my-awesome-api` with a `user` CRUD module in one command:

```bash
ezex my-awesome-api --all --crud user
```

This will create a new directory, initialize git, install all dependencies, and set up a complete server ready for you to code.

---

## 🔧 Usage & Commands

The general syntax is:

```bash
ezex [project-name-or-path] [flags] [names...]
```

### Available Flags

| Flag               | Alias | Description                                                              |
| ------------------ | ----- | ------------------------------------------------------------------------ |
| `--all`            |       | Scaffold a full project with all recommended features.                   |
| `--crud`           |       | Create a full CRUD module (Model, Controller, Router).                   |
| `--controller`     | `-c`  | Add one or more controller(s) to an existing project.                    |
| `--model`          | `-m`  | Add one or more model(s).                                                |
| `--router`         | `-r`  | Add one or more router(s).                                               |
| `--install`        | `-i`  | Install specific npm packages.                                           |
| `--dir`            | `-d`  | Create one or more custom directories.                                   |
| `--file`           | `-f`  | Create one or more custom files.                                         |
| `--help`           |       | Show this help menu.                                                     |
| `--version`        |       | Show the current version of ezex.                                        |

✅ Flags that accept multiple values (like `--crud`) can be followed by several names (e.g., `... --crud user post product`).

---

## 💡 Advanced Examples

### 1. Create a New Project Interactively

If you run `ezex` without the `--all` flag, it will guide you through an interactive setup process.

```bash
ezex my-new-project
```

This will start an interactive prompt

### 2. Add a New CRUD Module to an Existing Project

#### Assuming you are inside your project folder

```bash
ezex . --crud review
```

#### 3. Add Components Separately

You can generate individual parts of your application as needed.

```bash
ezex . --controller auth --model token
```

 Add a controller for authentication and a model for refresh tokens

#### 4. Use the Integrated Linter and Formatter

The generated project includes scripts for ESLint and Prettier.

Lint your entire project

```bash
npm run lint
npm run format
```

---

## 📁 Generated Project Structure

A project created with `ezex --all --crud user` will look like this:

```my-api/
├── config/
│   └── db.js               # MongoDB connection logic
├── controllers/
│   ├── Controller.js       # Generic CRUD functions
│   └── userController.js   # User-specific controller
├── middlewares/
│   └── errorMiddleware.js  # Global error handler
├── models/
│   └── User.js             # User Mongoose model
├── node_modules/
├── routers/
│   └── userRouter.js       # User API routes
├── utils/
│   ├── CustomError.js
│   └── QueryManipulator.js
├── .env                    # Environment variables (GIT-ignored)
├── .eslintrc.json          # ESLint configuration
├── .gitignore
├── .prettierrc             # Prettier configuration
├── app.js                  # Express app setup
├── package.json
├── package-lock.json
└── server.js               # Server entry point
```

---

## 🧑‍💻 Author

Made with ❤️ by **Ahmed Ali** & enhanced by **Ziad Morjan**.

---

## License

[ISC License](https://opensource.org/licenses/ISC)
