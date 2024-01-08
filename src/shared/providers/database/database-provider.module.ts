import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfigService = new DatabaseConfigService(configService);
        return ({
          type: 'mssql',
          host: dbConfigService.host,
          port: Number(dbConfigService.port),
          username: dbConfigService.username,
          password: dbConfigService.password,
          database: dbConfigService.databaseSource,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          extra: {
            trustServerCertificate: true,
          },
          // logging: true
        } as TypeOrmModuleAsyncOptions);
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfigService = new DatabaseConfigService(configService);
        return ({
          type: 'mssql',
          host: dbConfigService.host,
          port: Number(dbConfigService.port),
          username: dbConfigService.username,
          password: dbConfigService.password,
          database: dbConfigService.databaseDestination,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: await dbConfigService.migrations(),
          migrationsRun: true,
          extra: {
            trustServerCertificate: true,
          },
          autoLoadEntities: true,
          // logging: true
        } as TypeOrmModuleAsyncOptions);
      },
    }),
  ],
  providers: [DatabaseConfigService],
})
export class DatabaseProviderModule {

}
