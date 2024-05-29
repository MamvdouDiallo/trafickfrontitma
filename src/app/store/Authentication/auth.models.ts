export interface Auth {
  token: string;
  user?: User;
}

export interface User {
  id?: number;
  lastname?: string;
  firstname?: string;
  email?: string;
  date_of_birth?: string;
  place_of_birth?: string;
  enabled?: boolean;
  image?: Image;
  roles?: Role[];
}

export interface Image {
  idImage?: number;
  name?: string;
  type?: string;
  image?: number[];
}

export interface Role {
  name?: string;
}
