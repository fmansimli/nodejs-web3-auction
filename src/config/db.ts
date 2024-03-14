import { MongoClient, type Db } from "mongodb";

class AppMongo {
  private instance: MongoClient;

  get client() {
    if (!this.instance) {
      throw new Error("mongo client has not been initialized yet");
    }
    return this.instance;
  }

  get db(): Db {
    if (!this.instance) {
      throw new Error("mongo client has not been initialized yet!");
    }
    return this.instance.db("mydb");
  }

  connect(url: string) {
    this.instance = new MongoClient(url);
    return this.instance.connect();
  }
}

export const mongo = new AppMongo();
