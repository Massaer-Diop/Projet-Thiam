import { Commune } from "./commune";

export class ListeCandidat {
    id!: number;
    nom_candidat!: string;
    prenom_candidat!: string;
    parti_politique!: string;
    image!: string;
    programme!: string;
    num_cni_candidat!: number;
    commune_id!: number
}
