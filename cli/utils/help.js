exports.help = () =>
  console.log(`ezex - Express Scaffold CLI

This tool will create a scaffolded Express project, asking for some options.

USAGE:
  ezex [flags] [names...]

FLAGS:
  -c           Add one or more controller(s).
  -m           Add one or more model(s).
  -r           Add one or more router(s).
  --crud       Create CRUD controller, router, and model, and add them to app.js.
  --all        Scaffold the app with all available features.
  --version        Show the current version.
  -i           Install one or more specific packages while creating the project.
  -d           Add one or more custom directory/directories.
  -f           Add one or more custom file(s). 

NOTES:
  - You can enter the project name if you are in correct folder or full path or just '.' That mean do that here
  - Use -c, -m, and -r after the project has been created.
  - --crud will create a project first if one does not exist.
  - You can combine --crud and --all to create a project with full options and CRUD support (recommended).
  - All flags that accept multiple values can be followed by several names.
  - For a full options project (--all), the following packages will be installed by default: express, dotenv, mongoose, cors, morgan, nodemon .

EXAMPLES:
  ezex --crud user post
      # Creates a project (if needed) and adds CRUD for 'user' and 'post'

  ezex --all --crud -i socket.io body-parser
      # Creates a full-featured project with CRUD and installs 'socket.io' and 'body-parser'

  ezex -c user post
      # Adds controllers for 'user' and 'post' (project must already exist)

  ezex -d src/api -f README.md routers/api.js
      # Adds a custom directory 'src/api' and a custom file 'README.md' and api.js under routers folder`);