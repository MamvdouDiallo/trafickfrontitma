export interface ResponseData<T> {
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

export interface Role {
  id?: number;
  name: string;
}

export interface NormeProject {
  titre: string;
  description: string;
  project: Project;
}

export interface Mo {
  checked: string;
  id?: number;
  lastname?: string;
  firstname?: string;
  email?: string;
  date_of_birth?: string;
  place_of_birth?: string;
  contact?: string;
  locality?: string;
  enabled?: boolean;
  image?: Image;
  role?: Role[];
  projects: Proj[];
}

export interface Proj {
  name?: string;
  description?: string;
  status?: string;
  categorie?: string;
  datedebut?: string;
  datefin?: string;
  image: Image;
  file: File[];
}
