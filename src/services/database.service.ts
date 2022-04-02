import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
let db: mongoDB.Db;

export const getMongoDBClient = async () => {
  if (db) {
    return db;
  }

  dotenv.config();
  const uri = process.env.MONGODB_URI
  const client = new mongoDB.MongoClient(uri, { serverApi: mongoDB.ServerApiVersion.v1 });
  client.connect(err => {
    if (err) {
      console.error('❌ Error connecting to database: ', err);
      client.close();
      console.error(err);
      process.exit(1);
    }
  });
  db = client.db(process.env.DB_NAME)
  console.log('🔋 Connected to database');
  return db
}
