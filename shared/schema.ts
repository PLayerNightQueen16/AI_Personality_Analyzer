import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const quizResults = pgTable("quiz_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  answers: jsonb("answers").notNull(),
  analysis: jsonb("analysis").notNull(),
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
});

export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

export const analyzeQuizRequestSchema = z.object({
  answers: z.array(z.string()),
});

export type AnalyzeQuizRequest = z.infer<typeof analyzeQuizRequestSchema>;

export interface VibeAnalysis {
  results: Array<{
    percentage: number;
    label: string;
    emoji: string;
  }>;
  binaryTags: Array<{
    code: string;
    meaning: string;
  }>;
  description: string;
}

export const sharedVibes = pgTable("shared_vibes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resultId: varchar("result_id").notNull(),
  imageData: text("image_data").notNull(), // base64 encoded PNG
  analysis: jsonb("analysis").notNull(),
  createdAt: varchar("created_at").notNull(),
});

export const createShareRequestSchema = z.object({
  resultId: z.string(),
  imageData: z.string().refine((data) => {
    // Validate base64 and size (limit to 5MB base64 ~ 3.75MB actual)
    return data.startsWith('data:image/png;base64,') && data.length < 5 * 1024 * 1024;
  }, {
    message: "Image must be a valid base64 PNG under 5MB"
  }),
});

export type CreateShareRequest = z.infer<typeof createShareRequestSchema>;
export type SharedVibe = typeof sharedVibes.$inferSelect;
