export class User {
  public sid: string;
  public username: string;
  public password: string;
  public email: string;

  constructor(attrs: Partial<User>) {
    Object.assign(this, attrs);
  }

  static exec() {
    //return mongo.db.collection("users");
    return;
  }
}
