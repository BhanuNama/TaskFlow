const { Sequelize } = require('sequelize');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

const connectDB = async () => {
  try {
    console.log('🔄 Connecting to PostgreSQL (Neon.tech)...');
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected successfully');
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');
  } catch (error) {
    console.error(`❌ PostgreSQL Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize };
