import { integer, pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Define the tasks table
export const tasksTable = pgTable('tasks_table', {
  id: serial('id').primaryKey(), 
  title: text('title').notNull(), 
  completed: boolean('completed').notNull().default(false), 
  userId: integer('user_id') 
  .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(), 
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date()),
});


export type InsertTask = typeof tasksTable.$inferInsert;
export type SelectTask = typeof tasksTable.$inferSelect;
