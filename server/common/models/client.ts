import mongoose from 'mongoose';

export interface IClient extends mongoose.Document {
  _id: string;
  clientId: string;
  clientSecret: string;
}

/* tslint:disable-next-line:variable-name This is a class */
export const Client: mongoose.Model<IClient> = mongoose.model<IClient>('Client', new mongoose.Schema({
  clientId: String,
  clientSecret: String,
}, {
  bufferCommands: false,
}));
