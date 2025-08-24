exports.pgOrmTemplate = `import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URI, {
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log('PostgreSQL (ORM) connected successfully');
} catch (error) {
  console.error('Unable to connect to PostgreSQL:', error);
}

export default sequelize;
`;