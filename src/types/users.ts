export interface IUser {
  id: string;
  name: string;
  password: string;
  image?: string;
  biography: string;
  contacts: {
    friends: string[];
    enemies: string[];
  };
}

export interface RegisterUser {
  name: string;
  password: string;
  image?: string;
  biography: string;
}

export interface LoginData {
  name: string;
  password: string;
}
