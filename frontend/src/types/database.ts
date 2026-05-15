export type UserRole = 'ADMIN' | 'MEDECIN' | 'SECRETAIRE';

export interface User {
    id_utilisateur: number;
    nom_utilisateur: string;
    role: UserRole;
    id_centre?: number;
}

export interface Donor {
    id_donneur: number;
    nom: string;
    prenom: string;
    cin: string;
    groupe_sanguin: 'A' | 'B' | 'AB' | 'O';
    rhesus: '+' | '-';
    adresse?: string;
    telephone?: string;
}

export interface Center {
    id_centre: number;
    nom_centre: string;
    adresse: string;
    telephone?: string;
}

export interface Donation {
    id_don: number;
    id_donneur: number;
    id_centre: number;
    date_don: string;
    statut: 'EN_STOCK' | 'UTILISE' | 'REJETE';
}

export type DonationStatus = Donation['statut'];
