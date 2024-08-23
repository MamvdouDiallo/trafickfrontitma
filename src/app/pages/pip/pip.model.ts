export interface ResponsePap {
  responseCode: number;
  data: any[];
  offset: number;
  max: number;
  length: number;
}

export interface Pap {
  id: number;
  idPap: number;
  nombreParcelle: number;
  idParcelle: number;
  categorie: string;
  prenom: string;
  nom: string;
  dateNaissance: string;
  lieuNaissance: string;
  sexe: string;
  age: number;
  nationalite: string;
  departement: string;
  commune: string;
  numeroIdentification: string;
  numeroTelephone: string;
  localiteResidence: string;
  statutPap: string;
  statutVulnerable: string;
  prenomExploitant: string;
  nomExploitant: string;
  superficieAffecte: number;
  typeCulture: string;
  typeEquipement: string;
  superficieCultive: number;
  descriptionBienAffecte: string;
}
