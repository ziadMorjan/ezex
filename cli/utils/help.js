
exports.help = () =>
	console.log(`
⚡ ezex - Express Scaffold CLI (v2.0)

This tool helps you scaffold and extend modern Express.js projects with ES Modules, ESLint, and Prettier.

USAGE:
  ezex [flags] [names...]

FLAGS:
  -c, --controller    Add one or more controller(s) to an existing project.
  -m, --model         Add one or more model(s) to an existing project.
  -r, --router        Add one or more router(s) to an existing project.
  --crud              Create full CRUD (controller + router + model) for given names.
  --all               Scaffold a full project with recommended structure and features.
  -i, --install       Install specific npm packages.
  -d, --dir           Create one or more custom directories.
  -f, --file          Create one or more custom files.
  --help              Show this help menu.
  --version           Show the current version.

NOTES:
  - Generated projects use ES Modules by default.
  - ESLint and Prettier are included for code quality and formatting.
  - Use '.' (dot) to target the current directory.
  - --crud will create a project if one doesn't exist.
  - --all installs: express, dotenv, mongoose, cors, morgan, nodemon, eslint, prettier and configs.

EXAMPLES:
  # Create a full-featured project with CRUD for 'user' and 'product'
  ezex my-api --all --crud user product

  # Add a new CRUD module to an existing project
  ezex . --crud review

  # Add a controller and a model separately
  ezex . -c auth -m token

  # Install a package and create a new directory
  ezex . -i bcryptjs -d services
`);
