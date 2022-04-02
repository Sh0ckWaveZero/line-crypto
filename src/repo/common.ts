import { getMongoDBClient } from "../services/database.service";

export class CommonRepo {
  dbClient: any;
  collection: string;
  constructor(collectionName: string) {
    this.dbClient = getMongoDBClient();
    this.collection = collectionName;
  }

  findBySymbol(symbol: string) {
    return this.dbClient
      .then((db: any) => db
        .collection(this.collection)
        .findOne({ symbol: symbol }));
  }

  addMany(items: any[]) {
    return this.dbClient
      .then((db: any) => db
        .collection(this.collection)
        .insertMany(items));
  }

}