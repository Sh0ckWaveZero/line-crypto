import { LiffInfo } from "interfaces/liff.interface";
import { CommonRepo } from "./common";

export class UsersRepo extends CommonRepo {
  expiresIn = Number(process.env.JWT_EXPIRES_IN);
  constructor() {
    super('users');
  }

  findByUserId(userId: string) {
    return this.dbClient
      .then((db: any) => db
        .collection(this.collection)
        .findOne({ userId }));
  }

  add(user: LiffInfo) {
    const data = {
      ...user,
      expiresIn: new Date(Date.now() + this.expiresIn),// 1 week
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return this.dbClient
      .then((db: any) => db
        .collection(this.collection)
        .insertOne(data));
  }

  update(user: LiffInfo) {
    const data = {
      $set: {
        ...user,
        expiresIn: new Date(Date.now() + this.expiresIn),// 1 week
        updatedAt: new Date()
      }
    }
    return this.dbClient
      .then((db: any) => db
        .collection(this.collection)
        .updateOne({ userId: user.userId }, data));
  }
}
