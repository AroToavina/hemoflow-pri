CREATE DATABASE IF NOT EXISTS projet;
USE projet;

CREATE TABLE IF NOT EXISTS donneurs (
    id_donneur INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    cin VARCHAR(20) NOT NULL UNIQUE,
    date_naissance DATE,
    groupe_sanguin ENUM('A', 'B', 'AB', 'O') NOT NULL,
    rhesus ENUM('+', '-') NOT NULL,
    adresse VARCHAR(255),
    telephone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS centres_collecte (
    id_centre INT AUTO_INCREMENT PRIMARY KEY,
    nom_centre VARCHAR(150) NOT NULL,
    adresse VARCHAR(255),
    telephone VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'MEDECIN', 'SECRETAIRE') NOT NULL DEFAULT 'SECRETAIRE',
    id_centre INT,
    FOREIGN KEY (id_centre) REFERENCES centres_collecte(id_centre) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS dons (
    id_don INT AUTO_INCREMENT PRIMARY KEY,
    id_donneur INT NOT NULL,
    id_centre INT NOT NULL,
    date_don DATE NOT NULL,
    statut ENUM('EN_STOCK', 'UTILISE', 'REJETE') DEFAULT 'EN_STOCK',
    FOREIGN KEY (id_donneur) REFERENCES donneurs(id_donneur) ON DELETE CASCADE,
    FOREIGN KEY (id_centre) REFERENCES centres_collecte(id_centre) ON DELETE CASCADE
);

-- Insertion de l'admin par défaut (nom: admin, mot de passe: admin123)
INSERT IGNORE INTO utilisateurs (nom_utilisateur, mot_de_passe, role) 
VALUES ('admin', '$2b$10$6TB2rA62t2cLFbk997MHYueMyCW.LXk8Mvv/QkG8Dh0VJThitR.uy', 'ADMIN');
