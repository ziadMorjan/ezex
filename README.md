# ⚡ ezex - Express Scaffold CLI

**ezex** is a powerful command-line tool that helps you scaffold and extend **Express.js** projects quickly and consistently. Whether you're building a simple API or a complete backend with models, routers, and controllers — ezex saves you time and effort.

---

## 📦 Installation

Install globally to use from anywhere:

```bash
npm install -g ezex
```

---

## 🚀 Usage

```bash
ezex [flags] [names...]
```

You can mix and match flags to generate controllers, models, routers, custom files, and directories.

---

## 🔧 Available Flags

| Flag        | Description                                                                      |
| ----------- | -------------------------------------------------------------------------------- |
| `-c`        | Add one or more controller(s) to an existing project.                            |
| `-m`        | Add one or more model(s) to an existing project.                                 |
| `-r`        | Add one or more router(s) to an existing project.                                |
| `--crud`    | Create full CRUD (controller + router + model). Creates a new project if needed. |
| `--all`     | Scaffold a full project with recommended structure and dependencies.             |
| `-i`        | Install specific npm packages. Works with new or existing projects.              |
| `-d`        | Create one or more custom directories.                                           |
| `-f`        | Create one or more custom files.                                                 |
| `--help`    | Show help menu.                                                                  |
| `--version` | Show the current version.                                                        |

✅ Flags that accept multiple values can be followed by several names.

---

## 💡 Notes

- Use the project name, a full path, or `.` to target the current directory.
- `--crud` will create the project first if it doesn't exist.
- Flags `-d`, `-f`, and `-i` only perform their actions on existing projects and **will not overwrite** core files like `app.js` or `server.js`.
- `--all` installs the following packages: `express`, `dotenv`, `mongoose`, `cors`, `morgan`, `nodemon`.

---

## 🧪 Examples

```bash
# Create a full project with CRUD for 'user' and 'post'
ezex --crud user post

# Create a full-featured project and install extra packages
ezex --all --crud -i socket.io body-parser

# Add controllers to an existing project
ezex -c user post

# Add a directory and custom files to an existing project
ezex -d src/api -f README.md routers/api.js

# Install a package in an existing project
ezex -i chalk
```

---

## 📁 Output Structure Example

```bash
myapp/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   └── postController.js
├── middlewares/
│   └── errorMiddleware.js
├── models/
│   ├── User.js
│   └── Post.js
├── node_modules/
├── routers/
│   ├── userRouter.js
│   └── postRouter.js
├── utils/
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── server.js
```

---

## 🧑‍💻 Author

Made with ❤️ by **Ahmed Ali**

---

## 🪪 License

[ISC License](https://opensource.org/licenses/ISC)

---

## 📌 Tips

- Use `--all` with `--crud` for a complete ready-to-use setup.
- Combine `-f`, `-d`, and `-i` to quickly extend existing projects.
- Run `ezex --help` for a quick reference guide.

---
