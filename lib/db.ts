import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  userId: string;
  metadata: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Memory {
  _id?: ObjectId;
  userId: string;
  sessionId: string;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id?: ObjectId;
  sessionId: string;
  userId: string;
  text: string;
  actor: 'me' | 'lilith';
  createdAt: Date;
}

export async function getOrCreateUser(userId: string): Promise<User> {
  const db = await getDatabase();
  const users = db.collection<User>('users');
  
  let user = await users.findOne({ userId });
  
  if (!user) {
    const newUser: User = {
      userId,
      metadata: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await users.insertOne(newUser);
    return { ...newUser, _id: result.insertedId };
  }
  
  return user as User;
}

export async function createMemory(userId: string, sessionId: string, summary: string): Promise<Memory> {
  const db = await getDatabase();
  const memories = db.collection<Memory>('memories');
  
  const memory: Memory = {
    userId,
    sessionId,
    summary,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  await memories.insertOne(memory);
  return memory;
}

export async function updateUserMetadata(userId: string, newMetadata: string): Promise<void> {
  const db = await getDatabase();
  const users = db.collection<User>('users');
  
  await users.updateOne(
    { userId },
    { 
      $addToSet: { metadata: newMetadata },
      $set: { updatedAt: new Date() }
    }
  );
}

export async function getAllSummaries(userId: string): Promise<Memory[]> {
  const db = await getDatabase();
  const memories = db.collection<Memory>('memories');
  
  return await memories.find({ userId }).sort({ createdAt: -1 }).toArray() as Memory[];
}

export async function createMessage(
  sessionId: string,
  userId: string,
  text: string,
  actor: 'me' | 'lilith'
): Promise<Message> {
  const db = await getDatabase();
  const messages = db.collection<Message>('messages');
  
  const message: Message = {
    sessionId,
    userId,
    text,
    actor,
    createdAt: new Date(),
  };
  
  await messages.insertOne(message);
  return message;
}

export async function getMessages(sessionId: string, userId: string): Promise<Message[]> {
  const db = await getDatabase();
  const messages = db.collection<Message>('messages');
  
  return await messages.find({ sessionId, userId }).sort({ createdAt: 1 }).toArray() as Message[];
}
