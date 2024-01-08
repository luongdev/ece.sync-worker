import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'mssql',
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<number>('DB_PORT')),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get('DB_DATABASE_DESTINATION'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*.ts'],
  extra: {
    trustServerCertificate: true,
  }
});
