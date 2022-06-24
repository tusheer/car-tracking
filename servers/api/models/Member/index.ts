import { Schema, model } from 'mongoose';

type MembershipType = 'VIP' | 'CHILDREN' | 'WOMEN' | 'PLAYER' | 'FOREIGNER' | 'NORMAL';

export interface IMember {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  number: string;
  avatar?: {
    url: string;
  };
  membershipType?: MembershipType;
  occupation: string;
  isDelete?: boolean;
}

// schema

const schema = new Schema<IMember>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, require: true },
    number: { type: String, required: true },
    uid: { type: String, required: true },
    avatar: {
      url: String,
    },
    membershipType: {
      type: String,
      enum: ['VIP', 'CHILDREN', 'WOMEN', 'PLAYER', 'FOREIGNER', 'NORMAL'],
      default: 'NORMAL',
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    occupation: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Member = model<IMember>('Member', schema);

export default Member;
