import { type User, type InsertUser, type QuizResult, type InsertQuizResult, type SharedVibe, type VibeAnalysis } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResult(id: string): Promise<QuizResult | undefined>;
  createSharedVibe(resultId: string, imageData: string, analysis: VibeAnalysis): Promise<SharedVibe>;
  getSharedVibe(id: string): Promise<SharedVibe | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quizResults: Map<string, QuizResult>;
  private sharedVibes: Map<string, SharedVibe>;

  constructor() {
    this.users = new Map();
    this.quizResults = new Map();
    this.sharedVibes = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuizResult(insertResult: InsertQuizResult): Promise<QuizResult> {
    const id = randomUUID();
    const result: QuizResult = { 
      id,
      answers: insertResult.answers,
      analysis: insertResult.analysis,
    };
    this.quizResults.set(id, result);
    return result;
  }

  async getQuizResult(id: string): Promise<QuizResult | undefined> {
    return this.quizResults.get(id);
  }

  async createSharedVibe(resultId: string, imageData: string, analysis: VibeAnalysis): Promise<SharedVibe> {
    const id = randomUUID();
    const sharedVibe: SharedVibe = {
      id,
      resultId,
      imageData,
      analysis,
      createdAt: new Date().toISOString(),
    };
    this.sharedVibes.set(id, sharedVibe);
    return sharedVibe;
  }

  async getSharedVibe(id: string): Promise<SharedVibe | undefined> {
    return this.sharedVibes.get(id);
  }
}

export const storage = new MemStorage();
