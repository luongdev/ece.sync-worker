import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { join } from 'path';
import { existsSync, readdirSync } from 'fs';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly _configService: ConfigService) {
  }

  get type(): string {
    return this._configService.get<string>('DB_TYPE');
  }

  get host(): string {
    return this._configService.get<string>('DB_HOST');
  }

  get port(): number {
    return this._configService.get<number>('DB_PORT');
  }

  get username(): string {
    return this._configService.get<string>('DB_USERNAME');
  }

  get password(): string {
    return this._configService.get<string>('DB_PASSWORD');
  }

  get databaseSource(): string {
    return this._configService.get<string>('DB_DATABASE_SOURCE');
  }

  get databaseDestination(): string {
    return this._configService.get<string>('DB_DATABASE_DESTINATION');
  }

  async migrations() {
    let migrations = [];
    const migrationsDir = process.env.PATH_MIGRATION ? process.env.PATH_MIGRATION : join(process.cwd(), 'dist', 'src', 'migrations');

    if (!existsSync(migrationsDir)) return migrations;

    const migrationFiles = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.js') && !f.endsWith('d.js'));

    for (const file of migrationFiles) {
      const migrationClass = await import(`${migrationsDir}/${file}`);
      migrations = [...migrations, ...Object.values(migrationClass)];
    }

    return migrations;
  }

  async enableCDC() {
    let migrations = [];
    const migrationsDir = process.env.PATH_MIGRATION ? process.env.PATH_MIGRATION : join(process.cwd(), 'dist', 'src', 'enable-cdc');

    if (!existsSync(migrationsDir)) return migrations;

    const migrationFiles = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.js') && !f.endsWith('d.js'));

    for (const file of migrationFiles) {
      const migrationClass = await import(`${migrationsDir}/${file}`);
      migrations = [...migrations, ...Object.values(migrationClass)];
    }

    return migrations;
  }
}
