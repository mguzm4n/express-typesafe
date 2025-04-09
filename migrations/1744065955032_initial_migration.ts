import { Kysely, sql } from 'kysely'

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
	// up migration code goes here...
	// note: up migrations are mandatory. you must implement this function.
	// For more info, see: https://kysely.dev/docs/migrations


	// table: courses
	await db.schema.createTable("courses")
		.addColumn("id", 'bigserial', col => col.primaryKey())
		.addColumn("name", "varchar(256)")
		.addColumn("description", "varchar(512)")
		.addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
		.execute();


	// table: units
	await db.schema.createTable("units")
		.addColumn("id", 'bigserial', col => col.primaryKey())
		.addColumn("name", "varchar(256)")
		.addColumn("description", "varchar(512)")
		.addColumn('created_at', 'timestamp', (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.execute();

	// table: lessons
	await db.schema.createTable("lessons")
		.addColumn("id", 'bigserial', col => col.primaryKey())
		.addColumn("name", "varchar(256)")
		.addColumn("description", "varchar(512)")
		.addColumn('created_at', 'timestamp', (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.execute();

	// table: link courses_units
	await db.schema.createTable("courses_units")
		.addColumn("course_id", 'bigint', col => 
			col.references("courses.id").onDelete("cascade").notNull()
		)
		.addColumn("unit_id", "bigint", col => 
			col.references("units.id").onDelete("cascade").notNull()
		)
		.addColumn("order_index", "integer")
		.addColumn('created_at', 'timestamp', (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.addPrimaryKeyConstraint("courses_units_pk", ["course_id", "unit_id"])
		.execute();

		
	// table: link units_lessons
	await db.schema.createTable("units_lessons")
		.addColumn("unit_id", 'bigint', col => 
			col.references("units.id").onDelete("cascade").notNull()
		)
		.addColumn("lesson_id", 'bigint', col => 
			col.references("lessons.id").onDelete("cascade").notNull()
		)
		.addColumn("order_index", "integer")
		.addColumn('created_at', 'timestamp', (col) =>
			col.defaultTo(sql`now()`).notNull(),
		)
		.addPrimaryKeyConstraint("units_lessons_pk", ["unit_id", "lesson_id"])
		.execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
	// down migration code goes here...
	// note: down migrations are optional. you can safely delete this function.
	// For more info, see: https://kysely.dev/docs/migrations
	
	await db.schema.dropTable('courses_units').ifExists().execute()
	await db.schema.dropTable('units_lessons').ifExists().execute()


  await db.schema.dropTable('courses').ifExists().execute()
	await db.schema.dropTable('units').ifExists().execute()
	await db.schema.dropTable('lessons').ifExists().execute()

}
