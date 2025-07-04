exports.help = () =>
  console.log(`ezex - Express Scaffold CLI

This tool helps you scaffold and extend Express.js projects quickly and consistently.

USAGE:
  ezex [flags] [names...]

FLAGS:
  -c           Add one or more controller(s) to an existing project.
  -m           Add one or more model(s) to an existing project.
  -r           Add one or more router(s) to an existing project.
  --crud       Create full CRUD (controller + router + model) for given names. Creates a new project if one doesn't exist.
  --all        Scaffold a full project with recommended structure and features.
  -i           Install specific npm packages. Can be used with new or existing projects.
  -d           Create one or more custom directories. Can be used with new or existing projects.
  -f           Create one or more custom files. Can be used with new or existing projects.
  --help       Show this help menu.
  --version    Show the current version.

NOTES:
  - You can enter the project name, a full path, or '.' (dot) to use the current directory.
  - Flags -c, -m, -r require an existing project.
  - Flags -d, -f, -i can be used with an existing project without re-scaffolding its core files (like app.js, server.js).
  - --crud will create a project first if one does not exist.
  - Combine --all and --crud for a full setup with useful features (recommended for new projects).
  - All flags that accept multiple values can be followed by several names.
  - For a full options project (--all), the following packages will be installed by default: express, dotenv, mongoose, cors, morgan, nodemon.

EXAMPLES:
  # Create a full project with CRUD for 'user' and 'post' (creates project if needed)
  ezex --crud user post

  # Create a full-featured project and install extra packages
  ezex --all --crud -i socket.io body-parser

  # Add controllers for an existing project
  ezex -c user post

  # Add a directory and some custom files to an existing project (will not overwrite app.js/server.js)
  ezex -d src/api -f README.md routers/api.js

  # Install a package to an existing project (will not overwrite app.js/server.js)
  ezex -i chalk
`);
