const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_QznpmJ3KT7AM@ep-old-lab-adiqon0x-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
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
