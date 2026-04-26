import { pgTable, text, integer, boolean, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// This app is fully frontend-driven with mock data.
// Minimal schema kept for template compatibility.
export const placeholder = pgTable('placeholder', {
  id: serial('id').primaryKey(),
  key: text('key').notNull(),
  value: text('value').notNull(),
});

export const insertPlaceholderSchema = createInsertSchema(placeholder).omit({ id: true });
export type InsertPlaceholder = z.infer<typeof insertPlaceholderSchema>;
export type Placeholder = typeof placeholder.$inferSelect;
