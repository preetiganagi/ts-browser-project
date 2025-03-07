import Role from "./Role";

export default interface User {
    id:  number,
    name: string,
    email: string,
    token: string;
    role: string;
    roles: Role[]
  }