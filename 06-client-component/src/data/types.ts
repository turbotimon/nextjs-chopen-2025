import {todos} from '@/db/schema';

export type Todo = typeof todos.$inferSelect
export type TodoInsert = typeof todos.$inferInsert