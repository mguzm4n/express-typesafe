import { defineConfig } from 'kysely-ctl';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      // Option 1: Use a connection string (Recommended for simplicity)
      // Ensure DATABASE_URL is set in your .env file or environment
      // Format: postgresql://user:password@host:port/database
      connectionString: process.env.DATABASE_URL,

      // Option 2: Use individual connection parameters
      // Uncomment these and comment out connectionString if you prefer
      /*
      host: process.env.PG_HOST || 'localhost',
      port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5432,
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD, // Add your password here or in .env
      database: process.env.PG_DATABASE || 'mydatabase',
      */

      // Optional pool configuration
      max: 5, // Max number of connections in the pool
    }),
  }),

  // === Optional Settings ===

  // Specify the folder where your migration files are located.
  // Defaults to './migrations' if not specified.
  // migrationFolder: 'src/migrations',

  // Specify the table name Kysely uses to track migration history.
  // Defaults to 'kysely_migrations' if not specified.
  // migrationTableName: 'schema_migrations',

  // Specify the lock timeout for migrations in milliseconds.
  // Useful in environments with concurrent migration attempts.
  // Defaults to 60000 (60 seconds) if not specified.
  // migrationLockTimeout: 60_000,

  // (Advanced) You can provide a custom Kysely instance if needed,
  // though usually the dialect is sufficient for kysely-ctl.
  // kysely?: Kysely<any>;
});