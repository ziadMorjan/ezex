# ⚡ ezex - Express Scaffold CLI

`ezex` is a powerful CLI tool that helps you scaffold and extend Express.js projects quickly and consistently. Whether you're creating a simple API or a full-featured backend with models, routers, and controllers — `ezex` saves you time and effort.

---

## 📦 Installation

Install globally to use it from anywhere on your machine:

```bash
npm install -g ezex
```

---

## 🚀 Usage

```bash
ezex [flags] [names...]
```

You can mix and combine flags to generate controllers, models, routers, custom files, and directories.

---

## 🔧 Available Flags

| Flag        | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| `-c`        | Add one or more controller(s)                                  |
| `-m`        | Add one or more model(s)                                       |
| `-r`        | Add one or more router(s)                                      |
| `--crud`    | Create full CRUD (controller + router + model) for given names |
| `--all`     | Scaffold full project with recommended structure and features  |
| `-i`        | Install specific npm packages while creating the project       |
| `-d`        | Create one or more custom directories                          |
| `-f`        | Create one or more custom files                                |
| `--help`    | For briefed help menu                                          |
| `--version` | Show the current version                                       |

> ✅ Flags that accept multiple values can be followed by several names.

---

## 💡 Notes

- You can enter the project name if you are in correct folder or full path or just '.' That mean do that here
- Use `-c`, `-m`, and `-r` **after** creating the project.
- `--crud` will **create a project first** if one doesn't exist.
- Combine `--all` and `--crud` for a full setup with useful features.
- `--all` installs: `express`, `dotenv`, `mongoose`, `cors`, `nodemon`.

---

## 🧪 Examples

```bash
# Create a full project with CRUD for 'user' and 'post'
ezex --crud user post
```

```bash
# Create a full-featured project and install extra packages
ezex --all --crud -i socket.io body-parser
```

```bash
# Add controllers for an existing project
ezex -c user post
```

```bash
# Add a directory and some custom files
ezex -d src/api -f README.md routers/api.js
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
│   └── globalErrorHandler.js
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

Made with ❤️ by _Ahmed Ali_

---

## 🪪 License

[ISC](LICENSE)

---

## 📌 Tips

- Use combined flags like `--all` with `--crud` to create full option project with full CRUD operations and `-f` with `-d` with `-i` to add custom files and foldes and packages in one shot .
- Use `--help` for briefed help menu
