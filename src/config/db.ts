import { MongoClient } from "mongodb";

class AppMongo {
  private instance: MongoClient;

  get client() {
    if (!this.instance) {
      throw new Error("mongo client has not been initialized yet");
    }
    return this.instance;
  }

  connect(url: string) {
    this.instance = new MongoClient(url);
    return this.instance.connect();
  }
}

export const mongo = new AppMongo();
