


- Setting up Kysely

- Need to install kysely, kysely-codegen and kysely-ctl
- Set .env with connection string for your db

1. Write your first migration file using kysely-ctl (through npx if not local)
  - This will generate .config/kysely.config.ts 
  - Run the migration 

2. Generate the type-safe .ts schema using kysely-codegen
  - Remember to select the casing option (i.e., --camel-case)

3. Use kysely query builder normally since now it's almost 100% type-safe
  - Create a kysely client in a db.ts file
  - Remember to use the casing plugin of your choice (camel/snake-case)