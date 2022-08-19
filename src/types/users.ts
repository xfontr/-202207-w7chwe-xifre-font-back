export interface User {
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
