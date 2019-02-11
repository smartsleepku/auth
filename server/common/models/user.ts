import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  _id: string;
  emailAddress: string;
  password: string;
  cpr?: string;
  address?: {
    street?: string;
    floor?: string;
    zip?: string;
    city?: string;
  };
}

/* tslint:disable-next-line:variable-name This is a class */
export const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', new mongoose.Schema({
  emailAddress: String,
  password: String,
  cpr: String,
  address: {
    street: String,
    floor: String,
    zip: String,
    city: String,
  },
}, {
  strict: false,
  bufferCommands: false,
}));
