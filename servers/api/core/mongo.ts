import mongoose from 'mongoose';
import dontenv from 'dotenv';
import { save, getAll as getAllMembers } from '../services/member';
import memberJson from '../setup/members.json';
import randomId from '../utils/randomId';

dontenv.config();

const connectWithDb = async (): Promise<void> => {
  const isMongoDbUrl = JSON.parse(process.env.IS_MONGODB_CLOUD_URL ? process.env.IS_MONGODB_CLOUD_URL : 'false');
  const uri =
    isMongoDbUrl === true
      ? process.env.MONGODB_CLOUD_URL
      : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  console.log(`Connecting to mongoDB...`);
  await mongoose.connect(uri, options as any);
  const memberData = await getAllMembers();
  if (!memberData.length) {
    console.log('Connected to MongoDB');
    for (let i = 0; i < memberJson.length; i++) {
      create(() =>
        save({
          ...(memberJson[i] as any),
          uid: 'CM-' + randomId(6),
        })
      );
    }
    console.log('Seeded members');
  }
};

const create = (fn) => new Promise((resolve) => setTimeout(() => resolve(fn()), 100));

export default connectWithDb;
