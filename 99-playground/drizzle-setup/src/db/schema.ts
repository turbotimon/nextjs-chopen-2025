import { sqliteTable, AnySQLiteColumn, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const todos = sqliteTable("todos", {
	id: integer().primaryKey().notNull(),
	title: text().notNull(),
	completed: integer().notNull(),
});

