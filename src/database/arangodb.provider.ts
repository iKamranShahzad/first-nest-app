import { Database } from 'arangojs';
import * as dotenv from 'dotenv';
dotenv.config();

const db = new Database({
  url: process.env.ARANGODB_URL || 'http://localhost:8529',
  databaseName: process.env.ARANGODB_DB || 'test',
  auth: {
    username: process.env.ARANGODB_USER || 'root',
    password: process.env.ARANGODB_PASS || '',
  },
});

const dbName = process.env.ARANGODB_DB || 'test';
export const database = db.database(dbName);

export const usersCollection = database.collection('users');
