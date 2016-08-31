import { User } from './user'

interface SessionInterface {
  sesssionId:string;
  user:User;
  createdAt:Date;
}

export class Session {
  sessionId:string;
  user:User;
  createdAt:Date;

  constructor (user:User, sessionId?:string) {
    this.user = user;
    this.createdAt = new Date();
    if (sessionId) {
      this.sessionId = sessionId;
    } else {
      this.sessionId = (Math.random()+1).toString(36).substring(8) + (new Date()).valueOf().toString();
    }
  }
}