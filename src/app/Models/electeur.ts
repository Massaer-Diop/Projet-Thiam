import { Commune } from "./commune";

export class Electeur {
    id!: number;
    nom_electeur!: string;
    prenom_electeur!: string;
    num_cni!: number;
    num_electeur!: number;
    adresse!: string;
    annee_naissance!: string;
    a_vote!: boolean;
    commune_id!: number

}
