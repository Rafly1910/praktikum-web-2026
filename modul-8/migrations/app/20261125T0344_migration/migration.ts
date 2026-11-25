#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/a6342e0d6a83ccb33cbdc41a54ee8db172247287ccd02cefa46a62885f32b91e/contract';
import endContract from '../../snapshots/a6342e0d6a83ccb33cbdc41a54ee8db172247287ccd02cefa46a62885f32b91e/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  primaryKey,
  sql,
  unique,
} from '@prisma/orm-mysql/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        table: 'User',
        columns: [
          col('createdAt', 'datetime(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'mysql/datetime@1', typeParams: { precision: 3 } },
          }),
          col('email', 'varchar(191)', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
          col('id', 'int', {
            notNull: true,
            default: fn(sql`autoincrement()`),
            codecRef: { codecId: 'mysql/int@1' },
          }),
          col('name', 'varchar(191)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
          col('updatedAt', 'datetime(3)', {
            notNull: true,
            codecRef: { codecId: 'mysql/datetime@1', typeParams: { precision: 3 } },
          }),
          col('username', 'varchar(191)', {
            codecRef: { codecId: 'sql/varchar@1', typeParams: { length: 191 } },
          }),
        ],
        constraints: [primaryKey(['id']), unique(['email'], { name: 'User_email_key' })],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
