import { DataSource } from 'typeorm';
import {db}  from './config';
import {Blog}  from '../models/Blog';
import { User } from '../models/User';
import Logger from '../utils/Logger';
// PostgreSQL database connection configuration
const AppDataSource = new DataSource({
  type: 'postgres',
  host: db.host || 'localhost',
  port: parseInt(db.port as string, 10) || 5432,
  username: db.user || 'username',
  password: db.password || 'password',
  database: db.name || 'blogdb',
  entities: [Blog, User],
  synchronize: true, // Set to false in production
  logging: false, // Set to true to see SQL logs
});

// Function to connect to the database
const connectDB = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    Logger.info('Database connected successfully');
  } catch (error) {
    Logger.error('Database connection error:', error);
    process.exit(1); // Exit the process with failure code
  }
};

export { connectDB, AppDataSource };
