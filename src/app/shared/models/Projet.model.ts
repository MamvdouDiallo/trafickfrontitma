export interface ResponseProject<T> {
  status: number;
  message: string;
  data: T;
}

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  status?: string;
  categorie?: string;
  datedebut?: string;
  datefin?: string;
  image?: Image;
  files?: File[];
}
export interface Proj {
  name?: string;
  description?: string;
  status?: string;
  categorie?: string;
  datedebut?: string;
  datefin?: string;
  image: Image;
}






export interface Image {
  idImage?: number;
  name?: string;
  type?: string;
  image?: number[];
}

export interface File {
  idImage?: number;
  name?: string;
  type?: string;
  image?: number[];
}
