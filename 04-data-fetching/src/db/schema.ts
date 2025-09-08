import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"


export const todos = sqliteTable("todos", {
	id: integer().primaryKey().notNull(),
	title: text().notNull(),
	completed: integer({ mode: "boolean" }).notNull(),
});

